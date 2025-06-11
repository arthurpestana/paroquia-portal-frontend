'use client'

import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { PageContent } from '@/components/adminComp/PageContent';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiltersSection } from '@/components/adminComp/FiltersSection';
import { useUpdatePageInUrl } from '@/hooks/useUpdatePageInUrl';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { MassTimeForm } from './_ui/MassTimeForm';
import { MassTimeList } from './_ui/MassTimeList';
import { useMassTimes } from '@/hooks/useMassTimes';

export default function MassTimesPage() {
    const searchParams = useSearchParams();
    const updatePageInUrl = useUpdatePageInUrl()
    const rowsPerPage = 10
    const router = useRouter();

    const [searchValue, setSearchValue] = useState('');
    const filters = useUrlFilters<{ title?: string }>();
    console.log('filters', filters);

    const initialPage = Math.max(0, Number(searchParams.get('page')))
    const [pageValue, setPageValue] = useState<number>(initialPage)

    const sub = searchParams.get('sub') || '';
    const id = searchParams.get('id') || '';

    const handleFilters = () => {
        const newFilters = {
            title: searchValue,
        };

        const params = new URLSearchParams(searchParams);
        params.set('filter', JSON.stringify(newFilters));
        params.delete('page');

        router.push(`?${params.toString()}`);
    };

    const { massTimes, loading, error, refetch } = useMassTimes({
        skip: pageValue,
        limit: pageValue * rowsPerPage,
        sort: "createdAt",
        sortType: "desc",
        filter: filters || {}
    })

    useEffect(() => {
        if (pageValue < 0) {
            setPageValue(0)
        } else {
            updatePageInUrl(pageValue)
        }
    }, [pageValue, updatePageInUrl])

    useEffect(() => {
        const filterParam = searchParams.get('filter');
        if (filterParam) {
            try {
                const parsed = JSON.parse(filterParam);
                if (parsed.title) {
                    setSearchValue(parsed.title);
                }
            } catch (e) {
                console.error('Erro ao parsear filtro da URL', e);
            }
        }
    }, [searchParams]);

    return (
        <PageContent>
            <div className={styles.massTimes__content}>
                <div className={styles.massTimes__content__header}>
                    <h1>Horários de Missas</h1>
                    <p>Aqui você pode administrar todos os horários de missas da plataforma</p>
                </div>
                <div className={styles.massTimes__content__body}>
                    <FiltersSection
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        handleFilters={handleFilters}
                        handleAddClick={() => {
                            const params = new URLSearchParams(searchParams);
                            params.set('sub', 'add');
                            router.push(`?${params.toString()}`);
                        }}
                    />
                    <MassTimeList
                        pageValue={pageValue}
                        setPageValue={setPageValue}
                        rowsPerPage={rowsPerPage}
                        dataMassTimes={{
                            loading,
                            error: error ? error.message : null,
                            massTimes: massTimes || { totalCount: 0, massTimes: [] },
                            refetch: refetch
                        }}
                    />
                </div>
            </div>
            {sub && (
                <MassTimeForm
                    key={sub + id}
                    id={id}
                    refetch={refetch}
                    onClose={() => {
                        const params = new URLSearchParams(searchParams);
                        params.delete('id');
                        params.delete('sub');
                        router.push(`?${params.toString()}`);
                    }}
                />
            )}
        </PageContent>
    );
}
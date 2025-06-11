'use client'

import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { PageContent } from '@/components/adminComp/PageContent';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiltersSection } from '@/components/adminComp/FiltersSection';
import { useUpdatePageInUrl } from '@/hooks/useUpdatePageInUrl';
import { useEvents } from '@/hooks/useEvents';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { EventForm } from './_ui/EventForm';
import { EventList } from './_ui/EventList';

export default function EventsPage() {
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

    const { events, loading, error, refetch } = useEvents({
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
            <div className={styles.events__content}>
                <div className={styles.events__content__header}>
                    <h1>Events</h1>
                    <p>Aqui você pode administrar todos os events da plataforma</p>
                </div>
                <div className={styles.events__content__body}>
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
                    <EventList
                        pageValue={pageValue}
                        setPageValue={setPageValue}
                        rowsPerPage={rowsPerPage}
                        dataEvents={{
                            loading,
                            error: error ? error.message : null,
                            events: events || { totalCount: 0, events: [] },
                            refetch: refetch
                        }}
                    />
                </div>
            </div>
            {sub && (
                <EventForm
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
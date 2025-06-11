'use client'

import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { PageContent } from '@/components/adminComp/PageContent';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiltersSection } from '@/components/adminComp/FiltersSection';
import { BannerList } from './_ui/BannerList';

export default function BannersPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const currentSearch = searchParams.get('search') || '';
        setSearchValue(currentSearch);
    }, [searchParams]);

    const handleFilters = () => {
        const params = new URLSearchParams(searchParams);
        params.set('search', searchValue);

        router.push(`?${params.toString()}`);
    };

    return (
        <PageContent>
            <div className={styles.banners__content}>
                <div className={styles.banners__content__header}>
                    <h1>Banners</h1>
                    <p>Aqui você pode administrar todos os banners da plataforma</p>
                </div>
                <div className={styles.banners__content__body}>
                    <FiltersSection
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        handleFilters={handleFilters}
                        handleAddClick={() => { }}
                    />
                    <div className={styles.banners__content__body__list}>
                        <BannerList/>
                    </div>
                </div>
            </div>
        </PageContent>
    );
}
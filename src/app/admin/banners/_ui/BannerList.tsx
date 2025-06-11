'use client'

import { List } from "@/components/adminComp/List"
import { ListContent } from "@/components/adminComp/List/ListContent"
import { ListText } from "@/components/adminComp/List/ListText"
import { NoContent } from "@/components/adminComp/NoContent"
import { ToggleButton } from "@/components/adminComp/ToggleButton"
import { Button } from "@/components/comp/Button"
import { LoadingComp } from "@/components/comp/LoadingComp"
import { useBanners } from "@/hooks/useBanners"
import { useUpdatePageInUrl } from "@/hooks/useUpdatePageInUrl"
import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export const BannerList = () => {
    const rowsPerPage = 10
    const searchParams = useSearchParams()
    const updatePageInUrl = useUpdatePageInUrl()

    const initialPage = Math.max(0, Number(searchParams.get('page')))
    const [pageValue, setPageValue] = useState<number>(initialPage)

    const { banners, loading, error } = useBanners()
    console.log(banners, loading, error)

    useEffect(() => {
        if (pageValue < 0) {
            setPageValue(0)
        } else {
            updatePageInUrl(pageValue)
        }
    }, [pageValue, updatePageInUrl])

    return (
        <div>
            {loading ? (
                <LoadingComp />
            ) : !banners || banners?.totalCount <= 0 ? (
                <NoContent
                    text="Nenhum banner encontrado"
                />
            ) : (
                <List
                    pageValue={pageValue}
                    setPageValue={setPageValue}
                    totalPages={Math.ceil(banners?.totalCount / rowsPerPage)}
                >
                    {banners?.banners?.map((banner, index) => (
                        <ListContent
                            key={banner._id || index}
                            index={index}
                            listHeader={true}
                            columns={[
                                {
                                    header: '#',
                                    data: <ListText text={index + 1 + pageValue * rowsPerPage} />,
                                    mini: true,
                                },
                                {
                                    header: 'Título do Banner',
                                    data: (
                                        <ListText text={banner.title} />
                                    )
                                },
                                {
                                    header: 'Descrição',
                                    data: <ListText text={banner?.description || 'N/A'} />,
                                },
                                {
                                    header: 'Ordem',
                                    data: (
                                        <ListText text={banner.order || 'N/A'} />
                                        // <ChangeInput 
                                        //     text={banner.order || ''}
                                        //     placeholder='Ordem'
                                        //     onValueChange={(e: any) => handleOrderChange(e, banner.id)}
                                        // />
                                    ),
                                },
                                {
                                    header: 'Status',
                                    data: <ToggleButton value={banner?.isActive} onChange={() => {}} />,
                                },
                                {
                                    header: 'Data de Cadastro',
                                    data: <ListText text={new Date(banner.createdAt).toLocaleDateString('pt-br') || 'N/A'} />,
                                },
                                {
                                    header: 'Opções',
                                    data: (
                                        <>
                                            <Button
                                                icon={<EditOutlined />}
                                                type={'button'}
                                                variant="contained"
                                                onClick={() => {}}
                                            />
                                            <Button
                                                icon={<DeleteForeverOutlined />}
                                                type={'button'}
                                                variant="contained"
                                                onClick={() => {}}
                                            />
                                        </>
                                    ),
                                    mini: true,
                                },
                            ]}
                        />
                    ))}
                </List>
            )}
        </div>
    )
}
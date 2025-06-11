'use client'

import { List } from "@/components/adminComp/List"
import { ListContent } from "@/components/adminComp/List/ListContent"
import { ListText } from "@/components/adminComp/List/ListText"
import { NoContent } from "@/components/adminComp/NoContent"
import { PopupAlert } from "@/components/adminComp/Popup/PopupAlert"
import { ToggleButton } from "@/components/adminComp/ToggleButton"
import { Button } from "@/components/comp/Button"
import { LoadingComp } from "@/components/comp/LoadingComp"
import { deleteContact, setActiveContact } from "@/lib/apiServices/Mutations"
import { ContactCountResponse } from "@/lib/types/QueriesTypes"
import { showToast } from "@/lib/utils/showToast"
import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type ContactListProps = {
    pageValue: number;
    setPageValue: (value: number) => void;
    rowsPerPage: number;
    dataContacts?: {
        loading: boolean;
        error: string | null;
        contacts: ContactCountResponse
        refetch: () => void;
    };
}

export const ContactList = ({ pageValue, setPageValue, rowsPerPage, dataContacts }: ContactListProps) => {
    const searchParams = useSearchParams();
    const [isOpenPopup, setIsOpenPopup] = useState<string | boolean>('')
    const [localData, setLocalData] = useState<ContactCountResponse["contacts"]>([]);

    useEffect(() => {
        if (dataContacts?.contacts?.contacts) {
            setLocalData(dataContacts.contacts.contacts);
        }
    }, [dataContacts?.contacts?.contacts])

    const handleEditItem = (id: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('id', id)
        params.set('sub', 'edit')
        window.history.pushState({}, '', `?${params.toString()}`)
    }

    const handleDeleteItem = async (id: string) => {
        if (!id) {
            showToast('ID não encontrado.', 'error', 'contact-error', 'top-right', 'light')
            return
        }

        try {
            await deleteContact(id)
            dataContacts?.refetch()
            showToast('Contato deletado com sucesso.', 'success', 'contact-error', 'top-right', 'light')
        }
        catch (error) {
            console.error('Erro ao excluir o contact:', error)
            showToast('Erro ao excluir o contato.', 'error', 'contact-error', 'top-right', 'light')
            return
        }
    }

    const handleActiveItem = async (id: string, newActive: boolean) => {
        if (!id) {
            showToast('ID não encontrado.', 'error', 'contact-error', 'top-right', 'light');
            return;
        }

        try {
            await setActiveContact(id, newActive);

            setLocalData(prev =>
                prev.map(contact =>
                    contact._id === id ? { ...contact, isActive: newActive } : contact
                )
            );
        } catch (error) {
            console.error('Erro ao atualizar o status do contato:', error);
            showToast('Erro ao atualizar o status do contato.', 'error', 'contact-error', 'top-right', 'light');
        }
    };

    return (
        <div>
            <PopupAlert
                title="Atenção"
                description="Você tem certeza que deseja excluir este contato? Essa ação não poderá ser desfeita."
                isOpen={!!isOpenPopup}
                setOpen={setIsOpenPopup}
                onSubmit={() => handleDeleteItem(isOpenPopup as string)}
                buttonLabel={{
                    confirm: 'Confirmar',
                    cancel: 'Cancelar'
                }}
            />
            {dataContacts?.loading ? (
                <LoadingComp />
            ) : !dataContacts?.contacts || dataContacts?.contacts?.totalCount <= 0 ? (
                <NoContent
                    text="Nenhum contato encontrado"
                />
            ) : (
                <List
                    pageValue={pageValue}
                    setPageValue={setPageValue}
                    totalPages={Math.ceil(dataContacts?.contacts?.totalCount / rowsPerPage)}
                >
                    {localData?.map((contact, index) => (
                        <ListContent
                            key={contact._id || index}
                            index={index}
                            listHeader={true}
                            columns={[
                                {
                                    header: '#',
                                    data: <ListText text={index + 1 + pageValue * rowsPerPage} />,
                                    mini: true,
                                },
                                {
                                    header: 'Tipo de Contato',
                                    data: (
                                        <ListText text={contact.type} />
                                    )
                                },
                                {
                                    header: 'Contato',
                                    data: <ListText text={contact?.value || 'N/A'} />,
                                },
                                {
                                    header: 'Status',
                                    data: <ToggleButton value={contact?.isActive} onChange={() => handleActiveItem(contact?._id, !contact?.isActive)} />,
                                },
                                {
                                    header: 'Data de Cadastro',
                                    data: <ListText text={new Date(contact.createdAt).toLocaleDateString('pt-br') || 'N/A'} />,
                                },
                                {
                                    header: 'Opções',
                                    data: (
                                        <>
                                            <Button
                                                icon={<EditOutlined />}
                                                type={'button'}
                                                variant="contained"
                                                onClick={() => handleEditItem(contact._id || '')}
                                            />
                                            <Button
                                                icon={<DeleteForeverOutlined />}
                                                type={'button'}
                                                variant="contained"
                                                onClick={() => setIsOpenPopup(contact._id || '')}
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
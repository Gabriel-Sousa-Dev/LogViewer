import React, { useRef } from "react";
import prettyBytes from 'pretty-bytes'
import { MoreHorizontal, PlusIcon } from "lucide-react";
import { Button } from "@heroui/button";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@heroui/dropdown";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
} from "@heroui/table";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure
} from "@heroui/modal"
import { Chip, type ChipProps } from "@heroui/chip";
import { Log, logs_mock, StatusLevel } from "@/mock/logs.mock.ts";
import { Input } from "@heroui/input";
import { useFiles } from "@/store/files";

const columns = [
    {
        key: "date",
        label: "Date",
    },
    {
        key: "content",
        label: "Content",
    },
    {
        key: "level",
        label: "Level",
    },
];

const statusColorMap: Record<StatusLevel, ChipProps["color"]> = {
    low: "success",
    medium: "warning",
    high: "danger",
};
export default function Home() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const files = useFiles(state => state.files)
    const addNewFile = useFiles(state => state.addNewFile)
    const removeFile = useFiles(state => state.removeFile)

    const inputFileRef = useRef<HTMLInputElement>(null)

    const renderCell = React.useCallback((log: Log, columnKey: keyof Log) => {
        const cellValue = log[columnKey];

        switch (columnKey) {
            case "date":
                return <p>{cellValue.toLocaleString("pt-br")}</p>;

            case "level":
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap[log.level] as ChipProps["color"]}
                        size="sm"
                        variant="flat"
                    >
                        {cellValue.toString()}
                    </Chip>
                );

            default:
                return <>{cellValue}</>;
        }
    }, []);

    function handleAddFile() {
        console.log(inputFileRef.current?.files)
        const newFile = inputFileRef.current?.files?.item(0)

        if (!newFile) {
            alert("Select a file in form")
            return;
        }

        addNewFile(newFile!)
    }

    return (
        <div className="container mx-auto p-6">
            <div className="min-h-screen flex gap-6 ">
                <div className="flex-grow-1 shrink-0">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-b-default">
                            <p className="font-bold text-lg">Files</p>

                            <Button
                                onPress={onOpen}
                                isIconOnly
                                variant="solid"
                                color="primary"
                                size="sm"
                            >
                                <PlusIcon size={20} />
                            </Button>
                        </div>

                        {
                            Array.from(Object.entries(files)).length === 0 ? (
                                <div className="bg-content2 px-3 py-2 flex items-center gap-2 rounded-md hover:bg-primary-50 hover:border-primary-100 border border-content4 shadow-small transition-colors cursor-pointer">
                                    <p className="text-content2-foreground text-sm grow truncate">
                                        Nenhum arquivo Selecionado
                                    </p>
                                </div>
                            ) : Array.from(Object.entries(files)).map(([id, file]) => (
                                <div key={id} data-file-id={id} className="bg-content2 px-3 py-2 flex items-center gap-2 rounded-md hover:bg-primary-50 hover:border-primary-100 border border-content4 transition-colors cursor-pointer">
                                    <p className="text-content2-foreground text-sm grow truncate">
                                        {file.name}
                                    </p>

                                    <p className="text-content2-foreground text-xs font-semibold text-nowrap">
                                        {prettyBytes(file.size)}
                                    </p>
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button isIconOnly size="sm" variant="flat">
                                                <MoreHorizontal size={15} />
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Static Actions">
                                            <DropdownItem key="copy">
                                                Copiar arquivo
                                            </DropdownItem>
                                            <DropdownItem key="edit">
                                                Editar arquivo
                                            </DropdownItem>
                                            <DropdownItem
                                                onClick={() => { removeFile(id) }}
                                                key="delete"
                                                className="text-danger"
                                                color="danger"
                                            >
                                                Deletar arquivo
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="flex-grow-10">
                    <Table aria-label="Example static collection table">
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn key={column.key}>
                                    {column.label}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody
                            items={logs_mock}
                            emptyContent={"Não há colunas para mostrar"}
                        >
                            {(item) => (
                                <TableRow key={item.key}>
                                    {(columnKey) => (
                                        <TableCell>
                                            {renderCell(
                                                item,
                                                columnKey as keyof Log,
                                            )}
                                        </TableCell>
                                    )}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="opaque">
                    <ModalContent>
                        {
                            (onClose) => (
                                <>
                                    <ModalHeader>
                                        <h3>
                                            New File
                                        </h3>
                                    </ModalHeader>
                                    <ModalBody>
                                        <Input ref={inputFileRef} type="file" placeholder="insira arquivos" multiple={false} />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onPress={onClose}>Fechar</Button>
                                        <Button onPress={handleAddFile} variant="solid" color="primary">Adicionar arquivo</Button>
                                    </ModalFooter>
                                </>
                            )
                        }
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
}

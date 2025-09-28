import React from "react";
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
import { Chip, type ChipProps } from "@heroui/chip";
import { Log, logs_mock, StatusLevel } from "@/mock/logs.mock.ts";

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

    return (
        <div className="container mx-auto p-6">
            <div className="min-h-screen flex gap-6 ">
                <div className="flex-grow-2">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-b-default">
                            <p className="font-bold text-lg">Files</p>

                            <Button
                                isIconOnly
                                variant="solid"
                                color="primary"
                                size="sm"
                            >
                                <PlusIcon size={20} />
                            </Button>
                        </div>
                        <div className="bg-content2 px-3 py-1.5 flex items-center gap-2 rounded-md hover:bg-primary-50 hover:border-primary-100 border-2 border-content4 transition-colors cursor-pointer">
                            <p className="text-content2-foreground text-sm grow">
                                logs.log
                            </p>

                            <p className="text-content2-foreground text-xs font-semibold">
                                10.4 kb
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
                                        key="delete"
                                        className="text-danger"
                                        color="danger"
                                    >
                                        Deletar arquivo
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
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
            </div>
        </div>
    );
}

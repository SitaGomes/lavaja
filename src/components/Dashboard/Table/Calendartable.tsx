import { useMemo, useState } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { BsPencilSquare } from "react-icons/bs";
import { AdicionalSchema } from "../../../views/App/Portfolio/Portfolio";

export type CalendarRowObj = {
  id: "";
  service: string;
  vehicle: string;
  date: string;
  adicionals: AdicionalSchema[];
  edit: boolean;
};

const columnHelper = createColumnHelper<CalendarRowObj>();

type CalendarTableProps = {
  data: CalendarRowObj[];
  onEdit: (id: Row<CalendarRowObj>) => void;
};

// eslint-disable-next-line
function CalendarTable({ data, onEdit }: CalendarTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const tableData = useMemo(() => [...data], [data]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("service", {
        id: "service",
        header: () => (
          <Text
            justifyContent="space-between"
            align="center"
            fontSize={{ sm: "10px", lg: "12px" }}
            color="gray.400"
          >
            Serviço
          </Text>
        ),
        // eslint-disable-next-line
        cell: (info) => (
          <Flex align="center">
            <Text fontSize="sm" fontWeight="700">
              {info.getValue()}
            </Text>
          </Flex>
        ),
      }),
      columnHelper.accessor("vehicle", {
        id: "vehicle",
        header: () => (
          <Text
            justifyContent="space-between"
            align="center"
            fontSize={{ sm: "10px", lg: "12px" }}
            color="gray.400"
          >
            Veiculo
          </Text>
        ),
        // eslint-disable-next-line
        cell: (info) => (
          <Flex align="center">
            <Text fontSize="sm" fontWeight="700">
              {info.getValue() || "Não informado"}
            </Text>
          </Flex>
        ),
      }),
      columnHelper.accessor("date", {
        id: "date",
        header: () => (
          <Text
            justifyContent="space-between"
            align="center"
            fontSize={{ sm: "10px", lg: "12px" }}
            color="gray.400"
          >
            Data e hora
          </Text>
        ),
        // eslint-disable-next-line
        cell: (info) => (
          <Flex align="center">
            <Text fontSize="sm" fontWeight="700">
              {info.getValue().toString()}
            </Text>
          </Flex>
        ),
      }),
      columnHelper.accessor("adicionals", {
        id: "adicionals",
        header: () => (
          <Text
            justifyContent="space-between"
            align="center"
            fontSize={{ sm: "10px", lg: "12px" }}
            color="gray.400"
          >
            Adicionais
          </Text>
        ),
        // eslint-disable-next-line
        cell: (info) => (
          <Flex align="center">
            <Text fontSize="sm" fontWeight="700">
              {info.getValue().toString()}
            </Text>
          </Flex>
        ),
      }),
      columnHelper.accessor("edit", {
        id: "edit",
        header: () => (
          <Text
            justifyContent="space-between"
            align="center"
            fontSize={{ sm: "10px", lg: "12px" }}
            color="gray.400"
          ></Text>
        ),
        // eslint-disable-next-line
        cell: () => (
          <Flex align="center">
            <Text fontSize="sm" fontWeight="700">
              <Icon
                as={BsPencilSquare}
                w={"20px"}
                h={"20px"}
                aria-label="Editar um veiculo"
                cursor={"pointer"}
              />
            </Text>
          </Flex>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <>
      <Table variant="simple" color="gray.500" mb="24px" mt="12px">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    pe="10px"
                    cursor="pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Flex
                      justifyContent="space-between"
                      align="center"
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color="gray.400"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: "",
                        desc: "",
                      }[header.column.getIsSorted() as string] ?? null}
                    </Flex>
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table
            .getRowModel()
            .rows.slice(0, 11)
            .map((row) => {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td
                        key={cell.id}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor="transparent"
                        onClick={() => onEdit(cell.row)}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </>
  );
}

export default CalendarTable;

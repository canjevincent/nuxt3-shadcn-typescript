import { h } from 'vue';
import type { ColumnDef } from '@tanstack/vue-table';
import ActionMenu from './CellAction.vue';
import ColorValue from './Value.vue';

export interface Color {
  id: string
  name: string
  value: string
  createdAt: string
}

export const columns: ColumnDef<Color>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => {
      return h(ColorValue, {
        colorCode: row.original.value
      })
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At'
  },
  {
    accessorKey: 'actions',
    enableHiding: false,
    cell: ({ row }: any) => {
      // const amount = Number.parseFloat(row.getValue('amount'))
      // const formatted = new Intl.NumberFormat('en-US', {
      //   style: 'currency',
      //   currency: 'USD',
      // }).format(amount)

      // return h('div', { class: 'text-right font-medium' }, formatted)
      const color = row.original
      return h('div', { class: 'relative' }, h(ActionMenu, {
        color
      }));
    },
  }
]
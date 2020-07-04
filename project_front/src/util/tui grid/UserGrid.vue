<template>
  <grid
    :data="gridProps.data"
    :columns="gridProps.columns"
    :rowHeaders="gridProps.rowHeaders"
    :columnOptions="gridProps.columnOptions"
  ></grid>
</template>

<script>
import 'tui-grid/dist/tui-grid.css';
import { Grid } from '@toast-ui/vue-grid';
export default {
  components: {
    grid: Grid,
  },
  created() {
    this.gridProps = {
      data: [
        // for rowData prop
        {
          name: 'Beautiful Lies',
          artist: 'Birdy',
        },
        {
          name: 'X',
          artist: 'Ed Sheeran',
        },
      ],
      columns: [
        // for columnData prop
        {
          header: 'Name',
          name: 'name',
        },
        {
          header: 'Artist',
          name: 'artist',
        },
      ],
    };
  },
};
</script>

<style></style>

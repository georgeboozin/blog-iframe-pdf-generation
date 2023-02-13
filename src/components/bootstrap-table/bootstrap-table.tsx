import Table from "react-bootstrap/Table";

function createData(
  id: string,
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData("1", "Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("2", "Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("3", "Eclair", 262, 16.0, 24, 6.0),
  createData("4", "Cupcake", 305, 3.7, 67, 4.3),
  createData("5", "Gingerbread", 356, 16.0, 49, 3.9),
];

export function BootstrapTable() {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Dessert (100g serving)</th>
          <th>Calories</th>
          <th>Fat&nbsp;(g)</th>
          <th>Carbs&nbsp;(g)</th>
          <th>Protein&nbsp;(g)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.calories}</td>
            <td>{row.fat}</td>
            <td>{row.carbs}</td>
            <td>{row.protein}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

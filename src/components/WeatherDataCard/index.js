import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
function WeatherDataCard({ graphData, stroke }) {
  const obj = {};
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={graphData}>
        <Line type="monotone" dataKey="value" stroke={stroke} />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis {...obj} />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
}
export default WeatherDataCard;

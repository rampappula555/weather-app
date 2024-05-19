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
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={graphData}>
        <Line type="monotone" dataKey="value" stroke={stroke} />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
}
export default WeatherDataCard;

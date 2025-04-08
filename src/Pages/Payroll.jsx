import { Trash2, UserRoundPen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DashboardLayout from "../Layout/DashboardLayout";

const Payroll = () => {
  const [tab, setTab] = useState("employees");
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);
  const [results, setResults] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    ctc: "",
    id: null
  });

  useEffect(() => {
    const stored = localStorage.getItem("employees");
    if (stored) {
      setEmployees(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addOrUpdateEmployee = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.department || !formData.ctc) return;

    if (formData.id !== null) {
      const updatedEmployees = employees.map((emp) =>
        emp.id === formData.id ? { ...formData, ctc: parseFloat(formData.ctc) } : emp
      );
      setEmployees(updatedEmployees);
    } else {
      const newEmployee = {
        ...formData,
        id: uuidv4(),
        ctc: parseFloat(formData.ctc)
      };
      setEmployees([...employees, newEmployee]);
    }

    setFormData({ name: "", email: "", phone: "", department: "", ctc: "", id: null });
  };

  const deleteEmployee = (id) => {
    const updatedList = employees.filter((emp) => emp.id !== id);
    setEmployees(updatedList);
    localStorage.setItem("employees", JSON.stringify(updatedList));
  };

  const editEmployee = (emp) => {
    setFormData({ ...emp });
  };

  const calculatePayroll = () => {
    const calculated = employees.map(emp => {
      const monthlyPay = emp.ctc / 12;
      const tax = (monthlyPay * 10) / 100;
      const netPay = monthlyPay - tax;
      return { ...emp, grossPay: monthlyPay, tax, netPay };
    });
    setResults(calculated);
  };

  const exportCSV = () => {
    const headers = ["Name", "Gross Pay", "Tax", "Net Pay"];
    const rows = results.map(emp => [
      emp.name,
      emp.grossPay.toFixed(2),
      emp.tax.toFixed(2),
      emp.netPay.toFixed(2)
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "payroll.csv";
    link.click();
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  const itemsPerPage = 5;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <DashboardLayout>
    <div className="max-w-6xl mx-auto p-6 space-y-6 font-serif">
      <div className="flex gap-4">
        {["employees", "Payroll"].map(t => (
          <button
            key={t}
            className={`px-4 py-2 rounded font-medium capitalize transition ${tab === t ? "bg-[#046169] text-white" : "bg-gray-200"}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "employees" && (
        <section className="bg-white p-6 rounded-xl shadow space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Employee Directory</h2>
            <input
              type="text"
              placeholder="Search by name..."
              className="px-3 py-1 border rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {["name", "email", "phone", "department", "ctc"].map((field) => (
              <input
                key={field}
                type={field === "ctc" ? "number" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={(e) => handleFormChange(field, e.target.value)}
                className="border px-3 py-2 rounded"
              />
            ))}
          </div>

          <button
            onClick={addOrUpdateEmployee}
            className={`px-4 py-2 rounded text-white ${formData.id ? "bg-yellow-600" : "bg-[#046169]"}`}
          >
            {formData.id ? "Update" : "Add"} Employee
          </button>

          <table className="min-w-full text-sm text-left text-gray-700 bg-white">
            <thead className="text-xs uppercase bg-gray-100 text-gray-600">
              <tr>
                {["Name", "Email", "Phone", "Department", "CTC", "Actions"].map(header => (
                  <th key={header} className="px-6 py-3">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition duration-200">
                  <td className="px-6 py-4 font-medium">{emp.name}</td>
                  <td className="px-6 py-4">{emp.email}</td>
                  <td className="px-6 py-4">{emp.phone}</td>
                  <td className="px-6 py-4">{emp.department}</td>
                  <td className="px-6 py-4">₹{emp.ctc.toLocaleString()}</td>
                  <td className="px-6 py-2 space-x-2">
                    <button onClick={() => editEmployee(emp)} className="text-blue-600 hover:underline text-sm"><UserRoundPen /></button>
                    <button onClick={() => deleteEmployee(emp.id)} className="text-red-600 hover:underline text-sm"><Trash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end space-x-2 mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 rounded ${page === p ? "bg-[#046169] text-white" : "bg-gray-200"}`}
              >
                {p}
              </button>
            ))}
          </div>
        </section>
      )}

      {tab === "Payroll" && (
        <section className="bg-white p-6 rounded-xl shadow space-y-4">
          <div className="flex items-center gap-4">
            <button onClick={calculatePayroll} className="mt-4 bg-[#046169] hover:bg-[#02474d] text-white p-4 py-2 rounded-md">
            {/* className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md p-4 */}
              Process Payroll
            </button>
            {results.length > 0 && (
              <button onClick={exportCSV} className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-md">
                Export CSV
              </button>
            )}
          </div>

          {results.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4">
              {results.map((res, i) => (
                <div key={i} className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="text-lg font-bold">{res.name}</h3>
                  <p><strong>Gross Pay:</strong> ₹{res.grossPay.toFixed(2)}</p>
                  <p><strong>Tax:</strong> ₹{res.tax.toFixed(2)}</p>
                  <p><strong>Net Pay:</strong> ₹{res.netPay.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
    </DashboardLayout>
  );
};

export default Payroll;

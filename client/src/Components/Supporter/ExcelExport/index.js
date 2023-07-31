import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import CtaBtn from "../../Original/CtaBtn";
import React, { useEffect, useState } from "react";
import { Report } from "../../../service";
import { toast } from "react-toastify";

const ReportExcel = ({ certiIds, fileName }) => {
  const [reportData, setReportData] = useState([]);

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const getExcelData = async () => {
    toast.success("Building the Report, please wait");
    const res = await Report.genReport({ certiIds });

    if (res.status === 200) {
      setReportData(res.data.reportData);
    } else {
      toast.error("Some Error occurred");
    }
  };

  useEffect(() => {
    if (reportData.length > 0) {
      exportToExcel();
    }
  }, [reportData]);

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(reportData);

    const cw = [];
    for (let i = 1; i <= reportData.length; i++) {
      const cellName = XLSX.utils.encode_cell({
        c: 5,
        r: i,
      });

      cw.push({ wch: 23 });

      ws[cellName].l = { Target: reportData[i - 1].Link };
      ws[cellName].s = { font: { color: { rgb: "0645AD" } } };
    }

    cw.push({ wch: 23 });
    cw.push({ wch: 40 });

    ws["!cols"] = cw;

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    toast.success("Report Built Successfully");
  };

  return (
    <span className="icons">
      <CtaBtn
        Text={"Download Report"}
        fontSize={16}
        onClick={() => getExcelData()}
      />
    </span>
  );
};

export default ReportExcel;

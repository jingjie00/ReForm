import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SettingActions } from "../reducers/settingReducer";

const PaymentButton = () => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [csvContent, setCsvContent] = useState([]); // State for storing CSV data

  // Handle file upload and preview generation
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileUploaded(true);

      const fileType = file.type;

      // Check if the file is an image
      if (fileType.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file);
        setImagePreview(imageUrl);
        setCsvContent([]); // Clear CSV content if previously set
      }
      // Check if the file is a CSV
      else if (fileType === "text/csv") {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target.result;
          parseCsv(text);
          setImagePreview(null); // Clear image preview if previously set
        };
        reader.readAsText(file);
      }

      // Dispatch the file to Redux
      //dispatch(SettingActions.setUploadedFile(file));
    //  alert("File uploaded successfully");
    }
  };

  // Parse CSV content and convert it to an array of rows and columns
  const  parseCsv = async (text) => {
    const rows = text.trim().split("\n");
    const data = rows.map((row) => row.split(","));
    setCsvContent(data);
    dispatch(SettingActions.setUploadedFile(data));

    const newRecord = {
      id: Date.now(),        // Generate a unique ID
      name: "Summary Invoice" + Date.now().toString(),   // Title of the record
      latex: String.raw`% LaTeX Simple Invoice Template
% By Amy Fare | amyfare.ca
% Source: amyfare.ca/files/simple_invoice_template.tex
% License: Creative Commons Attribution (CC BY 4.0)
% Feel free to distribute, modify, and use as you wish, but please keep this line and the 4 lines above unchanged.

\documentclass{letter}
\usepackage[utf8]{inputenc}
\usepackage[colorlinks]{hyperref}
\usepackage[left=1in,top=1in,right=1in,bottom=1in]{geometry} % Document margins
\usepackage{graphicx}
\usepackage{tabularx}
\usepackage{multirow}
\usepackage{ragged2e}
\usepackage{hhline}
\usepackage{array}
\usepackage{helvet}   % Use Helvetica font
\renewcommand{\familydefault}{\sfdefault} 


\hypersetup{
    urlcolor=blue
}

\newcolumntype{R}[1]{>{\raggedleft\let\newline\\\arraybackslash\hspace{0pt}}m{#1}}

\begin{document}
	
\thispagestyle{empty}

% Header, for company, invoice info
\begin{tabularx}{\textwidth}{l X l}
   \hspace{-8pt} \multirow{5}{}{\includegraphics[height=1.98cm]{logo_client.png}} & \textbf{J Bottle Supplier} & \hskip12pt\multirow{5}{}{\begin{tabular}{r}\footnotesize\bf INVOICE \\[-0.8ex] \footnotesize TEST01 \\[-0.4ex] \footnotesize\bf DATE \\[-0.8ex] \footnotesize \MakeUppercase{\today} \\[-0.4ex] \footnotesize\bf DUE \\[-0.8ex] \footnotesize UPON RECEIPT OF SERVICES \end{tabular}}\hspace{-6pt} \\
   & JBS & \\
   & JBS.my & \\
   & +6011-38100852 & \\
   & jbs@jingjietan.com & \\
\end{tabularx} 

\vspace{1 cm}

BILL TO

% Recipient name
\Large\textbf{MCMC}\normalsize

% Table of fees
\begin{tabularx}{\linewidth}{c X X X c}
    \hline
    & & & &\\[0.25ex]
    \centering{\bf{Product}} & \centering{\bf{Single Price}} & \centering{\bf{Quantity}} & \centering{\bf{Discount}} & \bf Payment\\[2.5ex]\hline
    & & & &\\
    \centering Large Red Bottle & \centering\$3.00 & \centering 600 & \centering -\$0.00 & \$9.00\\[2.5ex]\hline
    & & & &\\
    & & & \bf Total & \$1800.00\\[2.5ex]\hhline{~--}
    & & & & \\
    & & & \bf Payment received & \$1800.00\\[2.5ex]\hhline{~--}
    & & & & \\
    & & & \bf Balance due & \$0.00\\[2.5ex]\hhline{~==}
\end{tabularx}

\vspace{1 cm}

\Large\textbf{Payment instructions}\normalsize

\vspace{0.1 cm}

\textbf{E-transfer}\\
jbs@jingjietan.com

\textbf{TNG}\\
\href{https://tng.com}{6011-38100852}

\end{document}`,  // LaTeX content of the record
    };
  
    // Dispatch the new record to the Redux store
    dispatch(SettingActions.addRecord(newRecord));

    await navigator.clipboard.writeText('I submitted a past invoice sample.');
  };

  // Clean up the generated URL when the component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="flex flex-col items-center mt-8 overflow-x-hidden">
      {!fileUploaded ? (
        <label className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md shadow-md transition duration-200 cursor-pointer">
          <span>Upload File</span>
          <input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            accept=".csv, image/*" // Accept only CSV and image files
          />
        </label>
      ) : (
        <div className="bg-gray-100 p-4 rounded border border-gray-200 mt-4 text-center">
          <p className="font-semibold text-lg">File Uploaded Successfully!</p>
          <p><strong>File Name:</strong> {selectedFile.name}</p>
          <p><strong>File Size:</strong> {(selectedFile.size / 1024).toFixed(2)} KB</p>

          {/* Display Image Preview */}
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Uploaded preview"
                className="w-64 h-auto rounded shadow-md"
              />
            </div>
          )}

          {/* Display CSV Content as Table (Only First 10 Lines) */}
          {/* {!imagePreview && csvContent.length > 0 && (
            <div className="mt-4 max-w-full">
              <table className="table-auto border-collapse border border-gray-300">
                <thead>
                  <tr>
                    {csvContent[0].map((header, index) => (
                      <th key={index} className="border px-4 py-2 bg-gray-200">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {csvContent.slice(1, 11).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border px-4 py-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {csvContent.length > 11 && (
                <p className="text-sm text-gray-500 mt-2">
                  Showing first 10 rows of {csvContent.length - 1} total rows
                </p>
              )}
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};

export default PaymentButton;

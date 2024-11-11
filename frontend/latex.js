const data = [
  {
    id: 1,
    title: "Invoice for Bulk Order - Standard Bottles",
    markdown: "Invoice for bulk order of standard 500ml bottles.",
    latex: `
  \\documentclass{letter}
  \\usepackage[utf8]{inputenc}
  \\usepackage{graphicx, tabularx, hhline, array}
  \\usepackage[left=1in,top=1in,right=1in,bottom=1in]{geometry}
  \\renewcommand{\\familydefault}{\\sfdefault}
  
  \\begin{document}
  \\thispagestyle{empty}
  
  \\begin{tabularx}{\\textwidth}{l X r}
     \\textbf{ABC Bottle Co.} & & \\textbf{INVOICE} \\\\
     abc-bottle.com & & Invoice #: 0001 \\\\
     +123-456-7890 & & Date: \\today \\\\
  \\end{tabularx}
  
  \\vspace{1cm}
  
  \\Large\\textbf{Bill To: Bottle Supply Ltd}\\normalsize
  
  \\begin{tabularx}{\\linewidth}{c X X X c}
      \\hline
      \\centering\\bf Product & \\centering\\bf Unit Price & \\centering\\bf Quantity & \\centering\\bf Discount & \\bf Total \\\\ \\hline
      Standard Bottle & \\$0.50 & 1000 & \\$0.00 & \\$500.00 \\\\ \\hline
  \\end{tabularx}
  
  \\vspace{1cm}
  
  \\textbf{Payment Due: Upon Receipt}
  
  \\end{document}`
  },
  {
    id: 2,
    title: "Custom Bottle Design Quotation",
    markdown: "Quotation for designing custom bottle shapes and logos.",
    latex: `
  \\documentclass{letter}
  \\usepackage[utf8]{inputenc}
  \\usepackage{graphicx, tabularx, hhline, array}
  \\usepackage[left=1in,top=1in,right=1in,bottom=1in]{geometry}
  \\renewcommand{\\familydefault}{\\sfdefault}
  
  \\begin{document}
  \\thispagestyle{empty}
  
  \\begin{tabularx}{\\textwidth}{l X r}
     \\textbf{Custom Bottle Design LLC} & & \\textbf{QUOTATION} \\\\
     design-bottles.com & & Quote #: 0023 \\\\
     +987-654-3210 & & Date: \\today \\\\
  \\end{tabularx}
  
  \\vspace{1cm}
  
  \\Large\\textbf{For: Premium Bottle Solutions}\\normalsize
  
  \\begin{tabularx}{\\linewidth}{c X X c}
      \\hline
      \\centering\\bf Service & \\centering\\bf Description & \\centering\\bf Rate & \\bf Total \\\\ \\hline
      Bottle Design & Custom shape and logo design & \\$100.00 & \\$100.00 \\\\ \\hline
  \\end{tabularx}
  
  \\vspace{1cm}
  
  \\textbf{Note: Pricing valid for 30 days.}
  
  \\end{document}`
  },
  {
    id: 3,
    title: "Monthly Bottle Supply Report",
    markdown: "Summary report for monthly bottle supplies provided.",
    latex: `
  \\documentclass{article}
  \\usepackage[utf8]{inputenc}
  \\usepackage{graphicx, tabularx, hhline, array}
  \\usepackage[left=1in,top=1in,right=1in,bottom=1in]{geometry}
  \\renewcommand{\\familydefault}{\\sfdefault}
  
  \\begin{document}
  
  \\title{Monthly Supply Report}
  \\date{\\today}
  \\maketitle
  
  \\section*{Client: ABC Distributors}
  \\section*{Month: January}
  
  \\begin{tabularx}{\\linewidth}{|X|X|X|X|}
  \\hline
  Product & Quantity Delivered & Unit Price & Total Amount \\\\ \\hline
  Standard Bottle & 2000 & \\$0.50 & \\$1000.00 \\\\ \\hline
  Large Bottle & 1500 & \\$0.75 & \\$1125.00 \\\\ \\hline
  \\end{tabularx}
  
  \\end{document}`
  },
  {
    id: 4,
    title: "Quality Assurance Checklist",
    markdown: "Checklist for quality control on manufactured bottles.",
    latex: `
  \\documentclass{article}
  \\usepackage[utf8]{inputenc}
  \\usepackage{graphicx, tabularx, hhline, array}
  \\usepackage[left=1in,top=1in,right=1in,bottom=1in]{geometry}
  \\renewcommand{\\familydefault}{\\sfdefault}
  
  \\begin{document}
  
  \\title{Quality Assurance Checklist}
  \\date{\\today}
  \\maketitle
  
  \\begin{itemize}
  \\item Bottle Shape Consistency
  \\item Volume Tolerance (+/- 0.5\\%)
  \\item Surface Finish Quality
  \\item Labeling Position Accuracy
  \\item Weight Verification
  \\end{itemize}
  
  \\end{document}`
  },
  {
    id: 5,
    title: "Heat Resistance Test Report",
    markdown: "Report documenting heat resistance tests for plastic bottles.",
    latex: `
  \\documentclass{article}
  \\usepackage[utf8]{inputenc}
  \\usepackage{graphicx, tabularx, hhline, array}
  \\usepackage[left=1in,top=1in,right=1in,bottom=1in]{geometry}
  \\renewcommand{\\familydefault}{\\sfdefault}
  
  \\begin{document}
  
  \\title{Heat Resistance Test Report}
  \\date{\\today}
  \\maketitle
  
  \\section*{Sample: Standard Plastic Bottle}
  \\section*{Test Conditions}
  Temperature: 100\\degree C \\\\
  
  \\section*{Results}
  \\begin{tabularx}{\\linewidth}{|X|X|}
  \\hline
  Test Duration & Observations \\\\ \\hline
  10 minutes & No Deformation \\\\ \\hline
  20 minutes & Minor Softening \\\\ \\hline
  \\end{tabularx}
  
  \\end{document}`
  },
  {
    id: 6,
    title: "Certificate of Compliance - Food Grade Bottles",
    markdown: "Certification document for food-grade compliant plastic bottles.",
    latex: `
  \\documentclass{letter}
  \\usepackage[utf8]{inputenc}
  \\usepackage{graphicx, tabularx, hhline, array}
  \\usepackage[left=1in,top=1in,right=1in,bottom=1in]{geometry}
  \\renewcommand{\\familydefault}{\\sfdefault}
  
  \\begin{document}
  \\thispagestyle{empty}
  
  \\begin{center}
     \\textbf{Certificate of Compliance} \\\\
     \\textbf{Food Grade Plastic Bottles} \\\\
     \\today \\\\
  \\end{center}
  
  \\vspace{1cm}
  
  \\noindent This is to certify that the plastic bottles produced under product code FG-500 meet the standards required for food-grade compliance as per FDA regulations. The bottles are free from harmful substances and suitable for direct food contact.
  
  \\vspace{1cm}
  
  \\noindent \\textbf{Certified By:} \\\\
  Quality Assurance Department \\\\
  ABC Bottle Co.
  
  \\end{document}`
  },
  {
    id: 7,
    title: "Material Safety Data Sheet - PET Bottles",
    markdown: "Safety data sheet for PET (Polyethylene Terephthalate) bottles.",
    latex: `
  \\documentclass{article}
  \\usepackage[utf8]{inputenc}
  \\usepackage{graphicx, tabularx, hhline, array}
  \\usepackage[left=1in,top=1in,right=1in,bottom=1in]{geometry}
  \\renewcommand{\\familydefault}{\\sfdefault}
  
  \\begin{document}
  
  \\title{Material Safety Data Sheet}
  \\date{\\today}
  \\maketitle
  
  \\section*{Product: PET Bottles}
  \\section*{Hazards Identification}
  Non-flammable and safe for general handling. \\newline
  \\textbf{Note:} Avoid exposure to extreme heat as plastic may release minor fumes.
  
  \\section*{First Aid Measures}
  \\begin{itemize}
  \\item \\textbf{Inhalation:} Move to fresh air.
  \\item \\textbf{Ingestion:} Rinse mouth; seek medical attention if necessary.
  \\end{itemize}
  
  \\end{document}`
  },
  {
    id: 8,
    title: "Production Report - Weekly Output",
    markdown: "Weekly production report detailing total output and efficiency.",
    latex: `
  \\documentclass{article}
  \\usepackage[utf8]{inputenc}
  \\usepackage{graphicx, tabularx, hhline, array}
  \\usepackage[left=1in,top=1in,right=1in,bottom=1in]{geometry}
  \\renewcommand{\\familydefault}{\\sfdefault}
  
  \\begin{document}
  
  \\title{Weekly Production Report}
  \\date{\\today}
  \\maketitle
  
  \\section*{Summary}
  \\begin{tabularx}{\\linewidth}{|X|X|}
  \\hline
  Product Type & Quantity Produced \\\\ \\hline
  Standard Bottle (500ml) & 15000 units \\\\ \\hline
  Large Bottle (1L) & 12000 units \\\\ \\hline
  \\end{tabularx}
  
  \\vspace{0.5cm}
  Efficiency: 95\\% \\newline
  Downtime: 3 hours
  
  \\end{document}`
  },
  {
    id: 9,
    title: "Packaging Specifications - Custom Bottle Sets",
    markdown: "Packaging requirements and guidelines for custom bottle sets.",
    latex: `
  \\documentclass{article}
  \\usepackage[utf8]{inputenc}
  \\usepackage{graphicx, tabularx, hhline, array}
  \\usepackage[left=1in,top=1in,right=1in,bottom=1in]{geometry}
  \\renewcommand{\\familydefault}{\\sfdefault}
  
  \\begin{document}
  
  \\title{Packaging Specifications}
  \\date{\\today}
  \\maketitle
  
  \\section*{Product: Custom Bottle Sets}
  
  \\begin{itemize}
  \\item Box Dimensions: 40cm x 30cm x 20cm
  \\item Inner Padding: 5mm bubble wrap
  \\item Maximum Stack Height: 5 boxes
  \\end{itemize}
  
  \\end{document}`
  },
  {
    id: 10,
    title: "Environmental Impact Statement - Recycled Plastic Bottles",
    markdown: "Report on the environmental impact of bottles made from recycled plastic.",
    latex: `
  \\documentclass{article}
  \\usepackage[utf8]{inputenc}
  \\usepackage{graphicx, tabularx, hhline, array}
  \\usepackage[left=1in,top=1in,right=1in,bottom=1in]{geometry}
  \\renewcommand{\\familydefault}{\\sfdefault}
  
  \\begin{document}
  
  \\title{Environmental Impact Statement}
  \\date{\\today}
  \\maketitle
  
  \\section*{Product: Recycled Plastic Bottles}
  
  \\section*{Environmental Benefits}
  - Reduces landfill waste by 40\\%
  - Lowers energy consumption by 30\\%
  - CO2 Emissions: 0.5 kg per unit
  
  \\end{document}`
  }];

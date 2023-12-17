# Hospital-API

API handled 
0- /                             - root route is not handled<br/>
1- /doctors/register             - registration for doctor /
2- /doctors/login                - login for doctor
3- /pateints/regiter             - authenticated route for doctors only for registering new patients or getting data of already existing patient
4- /patients/:id                 - patient profile with patient DATA visualised
5- /patients/:id/create_report   - create report based on symptoms and status
6- /pateints/:id/all_reports     - fetch all past reports created till date of that specific patient
7- /reports/status               - get reports of all patients based of on filters using status

# Hospital-API<br/><br/>

API handled <br/>
0- /                             - root route is not handled<br/>
1- /doctors/register             - registration for doctor <br/>
2- /doctors/login                - login for doctor<br/>
3- /pateints/regiter             - authenticated route for doctors only for registering new patients or getting data of already existing patient<br/>
4- /patients/:id                 - patient profile with patient DATA visualised<br/>
5- /patients/:id/create_report   - create report based on symptoms and status<br/>
6- /pateints/:id/all_reports     - fetch all past reports created till date of that specific patient<br/>
7- /reports/status               - get reports of all patients based of on filters using status

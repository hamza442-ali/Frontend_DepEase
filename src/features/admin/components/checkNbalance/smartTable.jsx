
// import React, { useState } from "react";
// import {
//   CSmartTable,
//   CAvatar,
//   CBadge,
//   CCollapse,
//   CButton,
//   CCardBody,
// } from "@coreui/react-pro";

// export const SmartTable = () => {
//   const [details, setDetails] = useState([]);
//   const columns = [
//     {
//       key: "avatar",
//       label: "",
//       filter: false,
//       sorter: false,
//     },
//     {
//       key: "name",
//       _style: { width: "20%" },
//     },
//     "registered",
//     {
//       key: "role",
//       _style: { width: "20%" },
//     },
//     {
//       key: "status",
//       _style: { width: "20%" },
//     },
//     {
//       key: "show_details",
//       label: "",
//       _style: { width: "1%" },
//       filter: false,
//       sorter: false,
//     },
//   ];
//   const usersData = [
//     {
//       id: 1,
//       name: 'Samppa Nori',
//       avatar: '1.jpg',
//       registered: '2022/01/01',
//       role: 'Member',
//       status: 'Active',
//     },
//     {
//       id: 2,
//       name: 'Estavan Lykos',
//       avatar: '2.jpg',
//       registered: '2022/02/07',
//       role: 'Staff',
//       status: 'Banned',
//     },
//     {
//       id: 3,
//       name: 'Chetan Mohamed',
//       avatar: '3.jpg',
//       registered: '2022/02/07',
//       role: 'Admin',
//       status: 'Inactive',
//       _selected: true,
//     },
//     {
//       id: 4,
//       name: 'Derick Maximinus',
//       avatar: '4.jpg',
//       registered: '2022/03/19',
//       role: 'Member',
//       status: 'Pending',
//     },
//     {
//       id: 5,
//       name: 'Friderik Dávid',
//       avatar: '5.jpg',
//       registered: '2022/01/21',
//       role: 'Staff',
//       status: 'Active'
//     },
//     { 
//       id: 6,
//       name: 'Yiorgos Avraamu',
//       avatar: '6.jpg',
//       registered: '2022/01/01',
//       role: 'Member',
//       status: 'Active'
//     },
//     {
//       id: 7,
//       name: 'Avram Tarasios',
//       avatar: '7.jpg',
//       registered: '2022/02/07',
//       role: 'Staff',
//       status: 'Banned',
//       _selected: true,
//     },
//     {
//       id: 8,
//       name: 'Quintin Ed',
//       avatar: '8.jpg',
//       registered: '2022/02/07',
//       role: 'Admin',
//       status: 'Inactive'
//     },
//     { 
//       id: 9,
//       name: 'Enéas Kwadwo',
//       avatar: '9.jpg',
//       registered: '2022/03/19',
//       role: 'Member',
//       status: 'Pending'
//     },
//     { 
//       id: 10,
//       name: 'Agapetus Tadeáš',
//       avatar: '10.jpg',
//       registered: '2022/01/21',
//       role: 'Staff',
//       status: 'Active'
//     },
//     { 
//       id: 11,
//       name: 'Carwyn Fachtna',
//       avatar: '11.jpg',
//       registered: '2022/01/01',
//       role: 'Member',
//       status: 'Active'
//     },
//     {
//       id: 12,
//       name: 'Nehemiah Tatius',
//       avatar: '12.jpg',
//       registered: '2022/02/07',
//       role: 'Staff',
//       status: 'Banned',
//       _selected: true,
//     },
//     {
//       id: 13,
//       name: 'Ebbe Gemariah',
//       avatar: '13.jpg',
//       registered: '2022/02/07',
//       role: 'Admin',
//       status: 'Inactive'
//     },
//     {
//       id: 14,
//       name: 'Eustorgios Amulius',
//       avatar: '14.jpg',
//       registered: '2022/03/19',
//       role: 'Member',
//       status: 'Pending',
//     },
//     {
//       id: 15,
//       name: 'Leopold Gáspár',
//       avatar: '15.jpg',
//       registered: '2022/01/21',
//       role: 'Staff',
//       status: 'Active'
//     },
//   ]
//   const getBadge = (status) => {
//     switch (status) {
//       case "Active":
//         return "success";
//       case "Inactive":
//         return "secondary";
//       case "Pending":
//         return "warning";
//       case "Banned":
//         return "danger";
//       default:
//         return "primary";
//     }
//   };
//   const toggleDetails = (index) => {
//     const position = details.indexOf(index);
//     let newDetails = details.slice();
//     if (position !== -1) {
//       newDetails.splice(position, 1);
//     } else {
//       newDetails = [...details, index];
//     }
//     setDetails(newDetails);
//   };
//   return (
//     <div className="container mx-auto">
//       <CSmartTable
//         className="table w-full border-collapse border border-gray-300"
//         columns={columns}
//         items={usersData}
//         onFilteredItemsChange={(items) => {
//           console.log(items);
//         }}
//         onSelectedItemsChange={(items) => {
//           console.log(items);
//         }}
//         scopedColumns={{
//           avatar: (item) => (
//             <td className="p-2">
//               <CAvatar src={`/images/avatars/${item.avatar}`} />
//             </td>
//           ),
//           status: (item) => (
//             <td className="p-2">
//               <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
//             </td>
//           ),
//           show_details: (item) => (
//             <td className={`p-2 ${details.includes(item.id) ? 'bg-gray-100' : ''} hover:bg-gray-200 cursor-pointer`}>
//               <CButton
//                 color="primary"
//                 variant="outline"
//                 shape="square"
//                 size="sm"
//                 onClick={() => {
//                   toggleDetails(item.id);
//                 }}
//               >
//                 {details.includes(item.id) ? 'Hide' : 'Show'}
//               </CButton>
//             </td>
//           ),
//           details: (item) => (
//             <CCollapse visible={details.includes(item.id)}>
//               <CCardBody className="p-3">
//                 <h4>{item.username}</h4>
//                 <p className="text-muted">User since: {item.registered}</p>
//                 <CButton size="sm" color="info">
//                   User Settings
//                 </CButton>
//                 <CButton size="sm" color="danger" className="ml-1">
//                   Delete
//                 </CButton>
//               </CCardBody>
//             </CCollapse>
//           ),
//         }}
//         selectable
//         sorterValue={{ column: 'status', state: 'asc' }}
//         tableProps={{
//           className: 'add-this-class',
//           responsive: true,
//           striped: true,
//           hover: true,
//         }}
//         tableBodyProps={{
//           className: 'align-middle'
//         }}
//       />
//     </div>
//   );
// };

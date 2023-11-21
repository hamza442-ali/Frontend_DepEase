// import React from "react";
// import { Files } from "react-files";
// import { Button } from "@mantine/core";
// import { useRecoilState } from "recoil";
// import { AnimatePresence, motion } from "framer-motion";
// import { FilesPicked, UploadPercentages } from "./atoms";
// import { Progress } from "@mantine/core";

// export const File = () => {
//   const [selectedFiles, setSelectedFiles] = useRecoilState(FilesPicked);
//   const [filePercentages, setFilePercentages] = useRecoilState(UploadPercentages);

//   const onFilesChange = (files) => {
//     setSelectedFiles(files);
//     // Assuming you want to clear previous percentages when new files are selected
//     setFilePercentages(Array(files.length).fill(0));
//   };

//   const onFilesError = (error, file) => {
//     console.log(error.message);
//   };

//   const onFileDelete = (index) => {
//     setSelectedFiles((files) => files.filter((item, i) => i !== index));
//     setFilePercentages((percentages) => percentages.filter((item, i) => i !== index));
//   };

//   return (
//     <div className="grid grid-cols-12 h-full gap-x-5 justify-between">
//       <Files
//         className="md:col-span-6 col-span-12 w-full flex items-center cursor-pointer"
//         onChange={onFilesChange}
//         onError={onFilesError}
//         accepts={["image/*", ".pdf"]}
//         multiple={true}
//         clickable
//       >
//         <div className="w-full rounded-lg p-10 border-2 border-gray-200/20 border-dashed bg-zinc-500/10">
//           {/* Your file drop area content goes here */}
//           <p className="font-semibold text-2xl">Drag and drop your files here</p>
//           <p className="text-gray-400 mt-3">or click to select files: PNG, JPG, WebP, SVG, PDF</p>
//           <p className="text-gray-400">Maximum size: 10MB</p>
//           <Button variant="outline" color="gray" className="mx-auto">
//             Select a file
//           </Button>
//         </div>
//       </Files>

//       <div className="md:col-span-6 pt-10 pb-10 col-span-12 w-full h-full">
//         <span className="mb-3 flex justify-between">
//           <h3 className="text-lg font-semibold">Uploaded Files</h3>
//           {selectedFiles.length > 0 && (
//             <button className="underline text-xs" onClick={() => { setSelectedFiles([]); setFilePercentages([]) }}>
//               Clear All
//             </button>
//           )}
//         </span>
//         {selectedFiles.length > 0 && (
//           <div className="overflow-y-scroll h-[23rem] pr-1">
//             <AnimatePresence>
//               {selectedFiles.map((file, i) => (
//                 <motion.div
//                   key={file.id}
//                   initial={{ opacity: 0, width: 0 }}
//                   animate={{ opacity: 1, width: "auto" }}
//                   exit={{ opacity: 0, width: 0 }}
//                   transition={{ opacity: { duration: 0.2 }, width: { duration: 0.4 } }}
//                 >
//                   <FileItem file={file} onFileDelete={() => onFileDelete(i)} uploadPercent={filePercentages[i]} />
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         )}
//         {selectedFiles.length === 0 && (
//           <div className="w-full h-full flex items-center justify-center">
//             <div className="text-center">
//               {/* Placeholder for no files */}
//               <p className="font-medium mt-3">No files</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const FileItem = ({ file, uploadPercent, onFileDelete }) => {
//   return (
//     <div className="my-3 py-2 px-3 bg-zinc-300/20 border border-zinc-400 rounded flex justify-between items-center">
//       <div className="flex items-center gap-2 w-[90%]">
//         {/* Placeholder for file icon */}
//         <div className="w-[24px]">File Icon</div>
//         <div className="w-[86%]">
//           <span className="flex gap-x-1">
//             <p className="text-zinc-200 max-w-[80%] truncate">{file.name}</p>
//             <span>({file.sizeReadable})</span>
//             {uploadPercent > 0 && <span className="ml-auto">{uploadPercent}%</span>}
//           </span>
//           {uploadPercent > 0 && <Progress className="w-full my-1" size="sm" radius="xl" value={uploadPercent} />}
//         </div>
//       </div>
//       <button onClick={onFileDelete}>
//         {/* Placeholder for delete icon */}
//         <div className="w-[17px]">Delete Icon</div>
//       </button>
//     </div>
//   );
// };

// export default File;

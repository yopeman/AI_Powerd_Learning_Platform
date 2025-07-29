import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebars() {
  return (
    <div>
      <ul>
        <li><Link to='/fields'>Fields</Link></li>
        <li>Courses</li>
        <li>Chapters</li>
        <li>Topics</li>
      </ul>
    </div>
  )
}


// <details style={{ padding: '10px', cursor: 'pointer' }}>
//   <summary>Fields</summary>
//   <details>
//     <summary>Years - 1</summary>
//     <details>
//       <summary>Semester - 1</summary>
//       <details>
//         <summary>Course - 1</summary>
//         <ul>
//           <li>Topic - 1</li>
//           <li>Topic - 2</li>
//           <li>Topic - 3</li>
//         </ul>
//       </details>
//       <details>
//         <summary>Course - 2</summary>
//         <ul>
//           <li>Topic - 1</li>
//           <li>Topic - 2</li>
//           <li>Topic - 3</li>
//         </ul>
//       </details>
//       <details>
//         <summary>Course - 3</summary>
//         <ul>
//           <li>Topic - 1</li>
//           <li>Topic - 2</li>
//           <li>Topic - 3</li>
//         </ul>
//       </details>
//     </details>
//     <details>
//       <summary>Semester - 2</summary>
//       <details>
//         <summary>Course - 1</summary>
//         <ul>
//           <li>Topic - 1</li>
//           <li>Topic - 2</li>
//           <li>Topic - 3</li>
//         </ul>
//       </details>
//       <details>
//         <summary>Course - 2</summary>
//         <ul>
//           <li>Topic - 1</li>
//           <li>Topic - 2</li>
//           <li>Topic - 3</li>
//         </ul>
//       </details>
//       <details>
//         <summary>Course - 3</summary>
//         <ul>
//           <li>Topic - 1</li>
//           <li>Topic - 2</li>
//           <li>Topic - 3</li>
//         </ul>
//       </details>
//     </details>
//   </details>
//   <details>
//     <summary>Years - 2</summary>
//     <details>
//       <summary>Semester - 1</summary>
//       <details>
//         <summary>Course - 1</summary>
//         <ul>
//           <li>Topic - 1</li>
//           <li>Topic - 2</li>
//           <li>Topic - 3</li>
//         </ul>
//       </details>
//       <details>
//         <summary>Course - 2</summary>
//         <ul>
//           <li>Topic - 1</li>
//           <li>Topic - 2</li>
//           <li>Topic - 3</li>
//         </ul>
//       </details>
//       <details>
//         <summary>Course - 3</summary>
//         <ul>
//           <li>Topic - 1</li>
//           <li>Topic - 2</li>
//           <li>Topic - 3</li>
//         </ul>
//       </details>
//     </details>
//     <details>
//       <summary>Semester - 2</summary>
//       <details>
//         <summary>Course - 1</summary>
//         <ul>
//           <li>Topic - 1</li>
//           <li>Topic - 2</li>
//           <li>Topic - 3</li>
//         </ul>
//       </details>
//       <details>
//         <summary>Course - 2</summary>
//         <ul>
//           <li>Topic - 1</li>
//           <li>Topic - 2</li>
//           <li>Topic - 3</li>
//         </ul>
//       </details>
//       <details>
//         <summary>Course - 3</summary>
//         <ul>
//           <li>Topic - 1</li>
//           <li>Topic - 2</li>
//           <li>Topic - 3</li>
//         </ul>
//       </details>
//     </details>
//   </details>
//   <details>
//     <summary>Years - 3</summary>
//     <details>
//       <summary>Semester - 1</summary>
//       <details>
//         <summary>Course - 1</summary>
//         <ul>
//           <li>Topic - 1</li>
//           <li>Topic - 2</li>
//           <li>Topic - 3</li>
//         </ul>
//       </details>
//       <details>
//         <summary>Course - 2</summary>
//         <ul>
//           <li>Topic - 1</li>
//           <li>Topic - 2</li>
//           <li>Topic - 3</li>
//         </ul>
//       </details>
//       <details>
//         <summary>Course - 3</summary>
//         <ul>
//           <li>Topic - 1</li>
//           <li>Topic - 2</li>
//           <li>Topic - 3</li>
//         </ul>
//       </details>
//     </details>
//     <details>
//       <summary>Semester - 2</summary>
//       <details>
//         <summary>Course - 1</summary>
//         <ul>
//           <li>Topic - 1</li>
//           <li>Topic - 2</li>
//           <li>Topic - 3</li>
//         </ul>
//       </details>
//       <details>
//         <summary>Course - 2</summary>
//         <ul>
//           <li>Topic - 1</li>
//           <li>Topic - 2</li>
//           <li>Topic - 3</li>
//         </ul>
//       </details>
//       <details>
//         <summary>Course - 3</summary>
//         <ul>
//           <li>Topic - 1</li>
//           <li>Topic - 2</li>
//           <li>Topic - 3</li>
//         </ul>
//       </details>
//     </details>
//   </details>
//   <details>
//     <summary>Years - 4</summary>
//     <details>
//       <summary>Semester - 1</summary>
//       <details>
//         <summary>Course - 1</summary>
//         <ul>
//           <li>Topic - 1</li>
//           <li>Topic - 2</li>
//           <li>Topic - 3</li>
//         </ul>
//       </details>
//       <details>
//         <summary>Course - 2</summary>
//         <ul>
//           <li>Topic - 1</li>
//           <li>Topic - 2</li>
//           <li>Topic - 3</li>
//         </ul>
//       </details>
//       <details>
//         <summary>Course - 3</summary>
//         <ul>
//           <li>Topic - 1</li>
//           <li>Topic - 2</li>
//           <li>Topic - 3</li>
//         </ul>
//       </details>
//     </details>
//     <details>
//       <summary>Semester - 2</summary>
//       <details>
//         <summary>Course - 1</summary>
//         <ul>
//           <li>Topic - 1</li>
//           <li>Topic - 2</li>
//           <li>Topic - 3</li>
//         </ul>
//       </details>
//       <details>
//         <summary>Course - 2</summary>
//         <ul>
//           <li>Topic - 1</li>
//           <li>Topic - 2</li>
//           <li>Topic - 3</li>
//         </ul>
//       </details>
//       <details>
//         <summary>Course - 3</summary>
//         <ul>
//           <li>Topic - 1</li>
//           <li>Topic - 2</li>
//           <li>Topic - 3</li>
//         </ul>
//       </details>
//     </details>
//   </details>
// </details>
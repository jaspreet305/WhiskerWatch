// import React from "react";
// import "./AppointmentsScreen.css";
//
// export const AppointmentsScreen = () => {
//   return (
//     <div className={"appointments-screen-div"}>
//       <div className={"appointments-screen-div-2"}>
//         <div className={"appointments-screen-status-bar"}>
//           <div className={"appointments-screen-right-side"}>
//             <img className={"appointments-screen-battery"} src={"/img/battery.png"} />
//             <img className={"appointments-screen-img"} src={"/img/wifi-3.svg"} />
//             <img className={"appointments-screen-icon-bar-chart"} src={"/img/mobile-signal.svg"} />
//           </div>
//           <img className={"appointments-screen-left-side"} src={"/img/left-side.png"} />
//         </div>
//         <div className={"appointments-screen-overlap-group"}>
//           <img className={"appointments-screen-vector"} src={"/img/vector.svg"} />
//           <div className={"appointments-screen-rectangle"} />
//           <div className={"appointments-screen-text-wrapper"}>Noah Assayag</div>
//           <div className={"appointments-screen-text-wrapper-2"}>Dog Walking</div>
//           <div className={"appointments-screen-text-wrapper-3"}>27/08/2024</div>
//           <div className={"appointments-screen-text-wrapper-4"}>10:00am</div>
//         </div>
//         <div className={"appointments-screen-overlap"}>
//           <div className={"appointments-screen-text-wrapper-5"}>Emma Amar</div>
//           <div className={"appointments-screen-text-wrapper-6"}>Grooming</div>
//           <div className={"appointments-screen-text-wrapper-7"}>28/08/2024</div>
//           <div className={"appointments-screen-text-wrapper-8"}>10:00am</div>
//         </div>
//         <div className={"appointments-screen-overlap-group5"}>
//           <div className={"appointments-screen-text-wrapper-9"}>Jaspreet Singh</div>
//           <div className={"appointments-screen-text-wrapper-10"}>Dog Sitting</div>
//           <div className={"appointments-screen-text-wrapper-11"}>10:00am</div>
//           <div className={"appointments-screen-text-wrapper-12"}>22/09/2024</div>
//         </div>
//         <div className={"appointments-screen-overlap-group6"}>
//           <div className={"appointments-screen-text-wrapper-5"}>Oumar Barry</div>
//           <div className={"appointments-screen-text-wrapper-6"}>Cat Sitting</div>
//           <div className={"appointments-screen-text-wrapper-13"}>02/10/2024</div>
//           <div className={"appointments-screen-text-wrapper-14"}>10:00am</div>
//         </div>
//         <div className={"appointments-screen-overlap-group3"}>
//           <div className={"appointments-screen-text-wrapper-15"}>Amin Boulemkahel</div>
//           <div className={"appointments-screen-text-wrapper-16"}>Veterinarian</div>
//           <div className={"appointments-screen-text-wrapper-7"}>02/10/2024</div>
//           <div className={"appointments-screen-text-wrapper-8"}>10:00am</div>
//         </div>
//         <div className={"appointments-screen-overlap-group2"}>
//           <div className={"appointments-screen-text-wrapper-17"}>Anis Brachemi</div>
//           <div className={"appointments-screen-text-wrapper-6"}>Goat Sitting</div>
//           <div className={"appointments-screen-text-wrapper-7"}>02/10/2024</div>
//           <div className={"appointments-screen-text-wrapper-8"}>10:00am</div>
//         </div>
//         <div className={"appointments-screen-text"}>
//           <h1 className={"appointments-screen-h-1"}>Appointments</h1>
//         </div>
//         <div
//           className={"appointments-screen-overlap-group4"}
//           style={{
//             backgroundImage: "url(/img/rectangle-26-1.svg)",
//           }}
//         >
//           <img className={"appointments-screen-arrow"} src={"/img/arrow-1-1.svg"} />
//         </div>
//       </div>
//     </div>
//   );
// };
import React, { useState } from "react";
import "./AppointmentsScreen.css";
const appointments = [
  {
    name: "Noah Assayag",
    type: "Dog Walking",
    date: "27/08/2024",
    time: "10:00am",
  },
  {
    name: "Emma Amar",
    type: "Grooming",
    date: "28/08/2024",
    time: "10:00am",
  },
  // Add more appointments here
];

// Retrieve the first appointment in the array
export const firstAppointment = appointments[0];
console.log(firstAppointment == null);
export const AppointmentsScreen = () => {
  return (
      <div className={"appointments-screen-div"}>
        <div className={"appointments-screen-div-2"}>
          <div className={"appointments-screen-status-bar"}>
            <div className={"appointments-screen-right-side"}>
              <img className={"appointments-screen-battery"} src={"/img/battery.png"} />
              <img className={"appointments-screen-img"} src={"/img/wifi-3.svg"} />
              <img className={"appointments-screen-icon-bar-chart"} src={"/img/mobile-signal.svg"} />
            </div>
            <img className={"appointments-screen-left-side"} src={"/img/left-side.png"} />
          </div>
          <div className={"appointments-screen-overlap-group"}>
            <img className={"appointments-screen-vector"} src={"/img/vector.svg"} />
            <div className={"appointments-screen-rectangle"} />
            <div className={"appointments-screen-text-wrapper"}>{firstAppointment.name}</div>
            <div className={"appointments-screen-text-wrapper-2"}>{firstAppointment.type}</div>
            <div className={"appointments-screen-text-wrapper-3"}>{firstAppointment.date}</div>
            <div className={"appointments-screen-text-wrapper-4"}>{firstAppointment.time}</div>
          </div>
          {/*Code to render the rest of the appointments but doesn't work it stacks them on top of each other*/}
          {/*/!* Render the rest of the appointments *!/*/}
          {/*{appointments.slice(1).map((appointment, index) => (*/}
          {/*    <div key={index} className={"appointments-screen-overlap-group"}>*/}
          {/*      <div className={"appointments-screen-text-wrapper-5"}>{appointment.name}</div>*/}
          {/*      <div className={"appointments-screen-text-wrapper-6"}>{appointment.type}</div>*/}
          {/*      <div className={"appointments-screen-text-wrapper-7"}>{appointment.date}</div>*/}
          {/*      <div className={"appointments-screen-text-wrapper-8"}>{appointment.time}</div>*/}
          {/*    </div>*/}
          {/*))}*/}
          <div className={"appointments-screen-text"}>
            <h1 className={"appointments-screen-h-1"}>Appointments</h1>
          </div>
          <div
              className={"appointments-screen-overlap-group4"}
              style={{
                backgroundImage: "url(/img/rectangle-26-1.svg)",
              }}
          >
            <img className={"appointments-screen-arrow"} src={"/img/arrow-1-1.svg"} />
          </div>
        </div>
      </div>
  );

};

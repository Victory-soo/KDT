// const divStyle = {
//     backgroundColor: "skyblue",
// };

// const headingStyle = {
//     color: "white",
// };

// const spanStyle = {
//     backgroundColor: "lightgreen",
//     fontWeight: "700",
// };

// export default function TestCss() {
//     return (
//         <div className="component-root" style={divStyle}>
//             <h1 style={headingStyle}>Inline 방식 CSS 적용</h1>
//             <span style={spanStyle}>Span 방식 CSS 적용</span>
//         </div>
//     );
// }

import "../style/TestCss.scss";
export default function TestCss() {
    return (
        <div className="component-root">
            <h1>h1 방식 CSS 적용</h1>
            <span>span 방식 CSS 적용</span>
        </div>
    );
}

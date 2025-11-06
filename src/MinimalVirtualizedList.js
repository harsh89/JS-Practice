import { useState, useRef, useEffect } from "react";

const rowHeight = 40;
const tableHeight = 400;
const total = 10000;

const generateData = () => {
  return Array.from({ length: total }, (_, i) => ({
    serial: i,
    threatType: "Email",
  }));
};

const MinimalVirtualizedList = () => {
  const viewportRef = useRef(null);
  const data = useRef(generateData()).current;

  const visibleRowCount = Math.ceil(tableHeight / rowHeight);
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.floor(scrollTop / rowHeight);
  const endIndex = Math.min(startIndex + visibleRowCount, total);
  const visibleItems = data.slice(startIndex, endIndex);

  useEffect(() => {

    const handleScrollTop = (e) => {
        console.log(e.target.scrollTop);
        requestAnimationFrame(() => setScrollTop(e.target.scrollTop));
    };

    const vp = viewportRef.current;
    if (vp) {
      vp.addEventListener("scroll", handleScrollTop);
    }

    return () => {
      if (vp) {
        vp.removeEventListener("scroll", handleScrollTop);
      }
    };
  }, []);

  return (
    <div>
      <h3>Email Threat Records ({total.toLocaleString()})</h3>
      <div
        ref={viewportRef}
        style={{
          height: tableHeight,
          overflowY: "auto",
          border: "1px solid #ccc",
          position: "relative",
        }}
        // onScroll={handleScrollTop}
      >
        <div
          style={{
            height: total * rowHeight,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: startIndex * rowHeight,
              left: 0,
              right: 0,
            }}
          >
            {visibleItems?.map((item) => (
              <div
                style={{
                  height: rowHeight - 1,
                  borderBottom: "1px solid #eee",
                  padding: "0 8px",
                  display: "flex",
                  alignItems: "center",
                  fontFamily: "sans-serif",
                  fontSize: 14,
                  width: "100px",
                  background: "white",
                  color: "black",
                }}
                key={item?.serial}
              >
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p>{item?.serial}</p>
                  <p>{item?.threatType}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalVirtualizedList;

import Header from "../../components/Header";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { useRouter } from "next/router";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Read(props) {
  const router = useRouter();
  const [state, setState] = useState({ data: undefined, loading: true });

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  useEffect(() => {
    fetch(
      `http://localhost:3000/books/${router.asPath.split("/read/")[1]}/read`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("akidie-auth")}`,
        },
      }
    )
      .then((res) => {
        if (res.ok && res.status === 200) {
          return res.blob();
        } else {
          throw res.json();
        }
      })
      .then(async (data) => {
        toBase(data)
          .then((res) => {
            setState((s) => {
              return { ...s, data: res, loading: false };
            });
          })
          .catch(console.log);
      })
      .catch(console.log);
  }, []);

  return (
    <Header>
      <div className="pdf-container">
        {state.data && (
          <>
            <Document
              file={state.data}
              onLoadError={console.error}
              onLoadSuccess={onDocumentLoadSuccess}
              width="400"
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <div className="slider">
              <p>
                Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
              </p>
              <div className="slide-buttons">
                <button
                  type="button"
                  disabled={pageNumber <= 1}
                  onClick={previousPage}
                  className="read"
                >
                  Previous
                </button>
                <button
                  className="read"
                  type="button"
                  disabled={pageNumber >= numPages}
                  onClick={nextPage}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Header>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      beans: "man, i love beans",
    },
  };
}

function toBase(streamObj) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(streamObj);
  });
}

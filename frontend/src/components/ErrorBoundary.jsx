import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary:", error);
    console.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="container py-5 text-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="card border-0 shadow-sm p-5">
            <i
              className="bi bi-exclamation-triangle-fill text-danger fs-1"
            ></i>

            <h2 className="mt-3">Bir hata oluştu</h2>

            <p className="text-muted">
              Beklenmeyen bir hata meydana geldi.
            </p>

            <button
              className="btn btn-primary mt-2"
              onClick={() => window.location.reload()}
            >
              Sayfayı Yenile
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
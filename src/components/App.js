import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'
import { Navbar, Nav,Container} from 'react-bootstrap';

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  function collapseEditorHTML() {
    console.log("workingHTML");

  }
  function collapseEditorCSS() {
    console.log("workingCSs");
  }
  function collapseEditorJS() {
    console.log("workingJS");
  }
  return (
    <>
     <div>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Saravan</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#link" onClick={collapseEditorHTML}>index.html</Nav.Link>
              <Nav.Link href="#link" onClick={collapseEditorCSS}>index.css</Nav.Link>
              <Nav.Link href="#link" onClick={collapseEditorJS}>index.js</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>
      <div className="pane top-pane">
        <Editor
          classN="htmlE"
          language="xml"
          displayName="index.html"
          value={html}
          onChange={setHtml}
        />
        <Editor
          classN="cssE"
          language="css"
          displayName="index.css"
          value={css}
          onChange={setCss}
        />
        <Editor
          classN="jsE"
          language="javascript"
          displayName="index.js"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default App;

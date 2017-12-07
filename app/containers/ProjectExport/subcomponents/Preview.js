import React, { PropTypes } from 'react';
import { Document, Page } from 'react-pdf/build/entry.webpack';
import ScrollArea from 'components/ScrollArea';
import Button from 'components/Button';
import Icon from 'components/Icon';

class Preview extends React.PureComponent {
  static propTypes = {
    resetExport: PropTypes.func,
    resize: PropTypes.func,
    url: PropTypes.string,
  };
  state = { numPages: 1, pageNumber: 1 };
  componentWillMount() {
    this.props.resize('95vw');
  }
  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  };
  changePage = (n) => () => {
    const { numPages } = this.state;
    if (n <= numPages && n > 0) {
      this.setState({ pageNumber: n });
    }
  };
  render() {
    const { pageNumber, numPages } = this.state;
    const { url } = this.props;
    return (
      <div className="flex-auto flex flex-column">
        <div className="flex-auto modal-body relative">
          <div className="b1 overlay">
            <ScrollArea>
              <Document file={url} onLoadSuccess={this.onDocumentLoad}>
                <Page pageNumber={pageNumber} width={1100} />
              </Document>
            </ScrollArea>
          </div>
        </div>
        <footer className="modal-footer flex items-center justify-between">
          <div className="pr4 flex items-center">
            <Icon
              onClick={this.changePage(pageNumber - 1)}
              name="ChevronLeft"
            />
            <div className="dark4 px2">{`${pageNumber} / ${numPages}`}</div>
            <Icon
              onClick={this.changePage(pageNumber + 1)}
              name="ChevronRight"
            />
          </div>
          <div>
            <Button
              label="Back"
              secondary
              inline
              onClick={this.props.resetExport}
            />
            <Button to={url} label="Download" icon="DownloadCloud" download />
          </div>
        </footer>
      </div>
    );
  }
}

export default Preview;

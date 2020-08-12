import React, { useEffect, useState } from 'react';

const Thumbs = props => {
  const { file } = props;
  //const [loading, setloading] = useState(false);
  const [thumb, setthumb] = useState(undefined);

  useEffect(() => {
    if (!file) { return; }
    if (typeof (file) !== "string") {
      let reader = new FileReader();

      reader.onloadend = () => {
        setthumb(reader.result);
      }
      reader.readAsDataURL(file);
    } else{
      setthumb(file);
    }

  }, [file])

  if (!file) { return null; }

  return (
    <div className="w-100">
      <img src={thumb}
        alt={file.name}
        className="img-thumbnail mt-2"
        height={300} width={400} 
      />
    </div>
  )
}

// class Thumbs extends React.Component {
//   state = {
//     loading: false,
//     thumb: undefined,
//   };

//   componentWillReceiveProps(nextProps) {
//     if (!nextProps.file) { return; }
//     if (typeof (nextProps.file) !== "string") {
//       this.setState({ loading: true }, () => {
//         let reader = new FileReader();

//         reader.onloadend = () => {
//           this.setState({ loading: false, thumb: reader.result });
//         };

//         reader.readAsDataURL(nextProps.file);
//       });
//     }
//     this.setState({ loading: false, thumb: nextProps.file});
//   }

//   render() {
//     const { file } = this.props;
//     const { loading, thumb } = this.state;

//     if (!file) { return null; }

//     if (loading) { return <p>loading...</p>; }

//     return (<img src={thumb}
//       alt={file.name}
//       className="img-thumbnail mt-2"
//       height={200}
//       width={200} />);
//   }
// }



export default Thumbs

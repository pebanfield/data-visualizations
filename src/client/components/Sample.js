import React, {PropTypes} from 'react';

class Sample extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.save = this.save.bind(this);
  }

  save() {
    console.log('test');
  }

  render() {


    return (
      <div>test</div>
    );
  }
}

Sample.propTypes = {
  func: PropTypes.func.isRequired
};

export default Sample;

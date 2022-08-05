import React from 'react';



export const Form = ({onSubmit}: any) => {
  return (
    <form onClick= {onSubmit}>
      <div className="form-group">
        <label htmlFor="title">title</label>
        <input className="form-control" id="title"/>
      </div>
      {/*todo: 여기에 시작 시간, 끝 시간 있어야 함*/}
      <div className="form-group">
        <label htmlFor="isGood">good?</label>
        <input
          className="form-control"
          id="isGood"
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">category</label>
        <input
          className="form-control"
          id="category"
        />
      </div>
      <div className="form-group">
        <label htmlFor="memo">memo</label>
        <input
          className="form-control"
          id="memo"
        />
      </div>

      <div className="form-group">
        <button className="form-control btn btn-primary" type="button">
          Submit
        </button>
      </div>
    </form>
  );
};
export default Form;

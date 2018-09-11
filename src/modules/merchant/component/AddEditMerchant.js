import React from 'react';
import { Layout } from '../../layout';
import { Paper } from '../../../components/paper';
import { TextInput } from '../../../components/text-input';
import styled from 'styled-components';
import { CheckboxInput } from '../../../components/selection-controls';
import { Button } from '../../../components/button';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import fetchHelper from '../../../helpers/fetchHelper';
import { IMGUR_CLIENT_ID, EMAIL_REGEX } from '../../../constant';
import { Snackbar } from '../../../components/snackbar';
import renderIf from '../../../helpers/renderIf';
import get from 'lodash.get';
import uuid from 'uuid/v1';
import BidTable from './BidTable';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class AddEditMerchant extends React.Component {
  constructor(props) {
    super(props);

    const merchantId = get(this, 'props.match.params.id');

    this.state = {
      merchantId,
      isLoading: !!merchantId,
      firstname: '',
      lastname: '',
      avatarUrl: '',
      email: '',
      phone: '',
      hasPremium: false,
      bids: []
    };
  }

  async componentDidMount() {
    const { merchantId } = this.state;
    if (merchantId) {
      const [data, status] = await fetchHelper.fetch(
        process.env.REACT_APP_API_URL + '/merchants/' + merchantId
      );

      if (status === 200) {
        this.setState({
          ...data,
          isLoading: false,
          bids: data.bids
        });
      } else {
        Snackbar.show({
          message: 'Fail to loading merchant. Please refresh the page!'
        });
      }
    }
  }
  onChangeInput = fieldName => event => {
    this.setState({ [fieldName]: event.target.value });
  };
  onChangeHasPremium = event => {
    this.setState({ hasPremium: event.target.checked });
  };
  submit = async e => {
    if (!this.isSubmitable()) return;
    e.preventDefault();

    if (this.state.merchantId) {
      //update
      await this.requestUpdate();
    } else {
      //add new
      await this.requestAddNew();
    }
  };
  requestUpdate = async () => {
    const [, status] = await fetchHelper.fetch(
      process.env.REACT_APP_API_URL + '/merchants/' + this.state.merchantId,
      {
        method: 'PUT',
        body: JSON.stringify({
          ...this.state,
          created: new Date().getTime()
        })
      }
    );

    if (status === 200) {
      this.backToList();
      Snackbar.show({ message: 'Merchant updated!' });
    } else {
      Snackbar.show({
        message: status + ' error on update merchant. Please try again later'
      });
    }
  };
  requestAddNew = async () => {
    const [, status] = await fetchHelper.fetch(
      process.env.REACT_APP_API_URL + '/merchants',
      {
        method: 'POST',
        body: JSON.stringify({
          ...this.state,
          //I know below should be created at server-side
          id: uuid(),
          created: new Date().getTime()
        })
      }
    );

    if (status === 201) {
      this.backToList();
      Snackbar.show({ message: 'Merchant created!' });
    } else {
      Snackbar.show({
        message: status + ' error on create merchant. Please try again later'
      });
    }
  };
  backToList = e => {
    this.props.dispatch(push('/merchants'));
  };
  isSubmitable = () => {
    return (
      this.state.avatarUrl &&
      this.state.firstname &&
      this.state.lastname &&
      this.state.email &&
      this.state.phone &&
      this.state.bids.length &&
      !this.state.isLoading &&
      !this.state.isBidTableLoading
    );
  };
  onUploadFile = async event => {
    let fileInput = event.target;
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('image', file);

    const [data, status] = await fetchHelper.fetch(
      'https://api.imgur.com/3/image/',
      {
        method: 'POST',
        headers: {
          Authorization: `Client-ID ${IMGUR_CLIENT_ID}`
        },
        body: formData
      },
      false
    );

    if (status === 200 && get(data, 'data.link')) {
      this.setState({
        avatarUrl: data.data.link
      });
    } else {
      Snackbar.show({
        message:
          status +
          ' error on upload image. You may need to try again with smaller image!'
      });
    }

    fileInput.value = '';
  };
  onChangeBids = bidIds => {
    this.setState({
      bids: bidIds
    });
  };
  onBidTableLoading = isLoading =>
    this.setState({ isBidTableLoading: isLoading });
  render() {
    return (
      <Layout>
        <h1>{this.state.merchantId ? 'Edit' : 'Add'} Merchant</h1>

        <Paper>
          <Tip>Fill all the fields with *</Tip>
          <Form onSubmit={this.submit}>
            Avatar *:<br />
            {renderIf(this.state.avatarUrl)(
              <Image src={this.state.avatarUrl} />
            )}
            <input type="file" accept="image/*" onChange={this.onUploadFile} />
            <TextInput
              value={this.state.firstname}
              label="First Name *"
              onChange={this.onChangeInput('firstname')}
            />
            <br />
            <TextInput
              value={this.state.lastname}
              label="Last Name *"
              onChange={this.onChangeInput('lastname')}
            />
            <br />
            <TextInput
              value={this.state.email}
              label="Email *"
              onChange={this.onChangeInput('email')}
            />
            {renderIf(this.state.email && !EMAIL_REGEX.test(this.state.email))(
              <ValidationError>Please input valid email</ValidationError>
            )}
            <TextInput
              value={this.state.phone}
              label="Phone *"
              onChange={this.onChangeInput('phone')}
            />
            <div style={{ height: '1rem' }} />
            <CheckboxInput
              label="Has Premium"
              isChecked={this.state.hasPremium}
              onChange={this.onChangeHasPremium}
            />
            <div style={{ height: '1rem' }} />
            <h4>Bids</h4>
            <BidTable
              bidIds={this.state.bids}
              merchantId={this.state.merchantId}
              onChange={this.onChangeBids}
              onLoading={this.onBidTableLoading}
            />
            <div style={{ height: '2rem' }} />
            <Button type="submit" disabled={!this.isSubmitable()}>
              Submit
            </Button>{' '}
            <Button type="button" onClick={this.backToList} color="default">
              Back To List
            </Button>
          </Form>
        </Paper>
      </Layout>
    );
  }
}

export default compose(
  connect(),
  withRouter
)(AddEditMerchant);

const Form = styled.form`
  width: 50%;
  padding: 1rem;
`;

const Image = styled.img`
  height: 100px;
  display: block;
`;

const Tip = styled.div`
  padding-top: 1rem;
  padding-left: 1rem;
  color: grey;
  font-size: 11px;
`;
const ValidationError = styled.div`
  color: red;
  font-size: 12px;
  padding-top: 10px;
`;

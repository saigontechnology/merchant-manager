import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead
} from '../../../components/table';
import { TextInput } from '../../../components/text-input';
import { Button } from '../../../components/button';
import fetchHelper from '../../../helpers/fetchHelper';
import uuid from 'uuid/v1';
import { Snackbar } from '../../../components/snackbar';

class BidTable extends React.Component {
  static propTypes = {
    merchantId: PropTypes.string,
    bidIds: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    onLoading: PropTypes.func.isRequired
  };
  state = {
    bids: [],
    newCarTitle: '',
    newAmount: 0
  };
  componentDidMount() {
    if (this.props.merchantId) this.requestBids(this.props.merchantId);
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.merchantId &&
      this.props.merchantId !== prevProps.merchantId
    ) {
      this.requestBids(this.props.merchantId);
    }
  }
  requestBids = async merchantId => {
    this.props.onLoading(true);
    this.setState({ isLoading: true });
    let [data, status] = await fetchHelper.fetch(
      process.env.REACT_APP_API_URL + '/merchants/' + merchantId + '/bids'
    );

    //HOT FIX, because json-server returns all bids, so we need this line
    data = data.filter(item => this.props.bidIds.includes(item.id));

    if (status === 200) {
      this.setState({
        bids: data,
        isLoading: false
      });
    } else {
      Snackbar.show({
        message: 'Fail to request bids. Please refresh the page!'
      });
    }

    this.props.onLoading(false);
  };
  create = async () => {
    this.props.onLoading(true);
    this.setState({ isLoading: true });

    const [data, status] = await fetchHelper.fetch(
      process.env.REACT_APP_API_URL + '/bids',
      {
        method: 'POST',
        body: JSON.stringify({
          carTitle: this.state.newCarTitle,
          amount: this.state.newAmount,
          //I know below should be created at server-side
          id: uuid(),
          created: new Date().getTime()
        })
      }
    );

    if (status === 201) {
      this.setState(
        {
          bids: [...this.state.bids, data],
          newCarTitle: '',
          newAmount: 0
        },
        () => {
          this.props.onChange(this.state.bids.map(bid => bid.id));
        }
      );
    } else {
      Snackbar.show({
        message: status + ' error on create bid. Please try again later'
      });
    }

    this.props.onLoading(false);
    this.setState({ isLoading: false });
  };
  isCreatable = () => {
    return (
      !this.state.isLoading && this.state.newCarTitle && this.state.newAmount
    );
  };
  onChangeNewCarTitle = e => this.setState({ newCarTitle: e.target.value });
  onChangeNewAmount = e => {
    const value = e.target.value;
    if (!value) this.setState({ newAmount: 0 });
    else {
      const numberValue = parseInt(e.target.value, 10);
      if (isNaN(numberValue)) return;
      this.setState({ newAmount: numberValue });
    }
  };

  sortByCreated = bids => bids.sort((b1, b2) => b2.created - b1.created);

  render() {
    const sortedBids = this.sortByCreated(this.state.bids);

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Car Title</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <TextInput
                value={this.state.newCarTitle}
                onChange={this.onChangeNewCarTitle}
              />
            </TableCell>
            <TableCell>
              <TextInput
                value={this.state.newAmount}
                onChange={this.onChangeNewAmount}
              />
            </TableCell>
            <TableCell>
              <Button disabled={!this.isCreatable()} onClick={this.create}>
                Create
              </Button>
            </TableCell>
          </TableRow>
          {sortedBids.map(bid => {
            return (
              <TableRow key={bid.id}>
                <TableCell>{bid.carTitle}</TableCell>
                <TableCell>{bid.amount}</TableCell>
                <TableCell>{getDateString(bid.created)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

export default BidTable;

function getDateString(time) {
  const date = new Date(time);
  return `${date.getFullYear()}/${date.getMonth() +
    1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}

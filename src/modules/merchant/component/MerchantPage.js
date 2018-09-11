import React from 'react';
import { Layout } from '../../layout';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TablePagination
} from '../../../components/table';
import renderIf from '../../../helpers/renderIf';
import styled from 'styled-components';
import { Paper } from '../../../components/paper';
import * as action from '../action';
import { connect } from 'react-redux';
import * as selector from '../selector';
import { Button } from '../../../components/button';
import { Toolbar } from '../../../components/toolbar';
import { push } from 'connected-react-router';
import { SearchBar } from '../../../components/search-bar';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import fetchHelper from '../../../helpers/fetchHelper';
import { Snackbar } from '../../../components/snackbar';

class MerchantPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(action.requestMerchants());
  }
  onClickEdit = merchant => {
    this.props.dispatch(push('/merchants/' + merchant.id));
  };
  onClickRemove = async merchant => {
    if (window.confirm('Are you sure to remove the merchant?')) {
      const [, status] = await fetchHelper.fetch(
        process.env.REACT_APP_API_URL + '/merchants/' + merchant.id,
        {
          method: 'DELETE'
        }
      );

      if ((status + '').startsWith('2')) {
        this.props.dispatch(action.removeMerchant(merchant.id));
      } else {
        Snackbar.show({
          message: status + ' error on remove merchant. Please try again later'
        });
      }
    }
  };
  onChangePage = (_, page) => {
    this.props.dispatch(action.changeMerchantPage(page));
  };
  onChangeRowsPerpage = event => {
    this.props.dispatch(action.changeMerchantRowsPerpage(event.target.value));
  };
  add = () => {
    this.props.dispatch(push('/merchants/add'));
  };
  onChangeSearch = e => {
    this.props.dispatch(action.changeMerchantsSearchText(e.target.value));
  };
  render() {
    const {
      isLoading,
      page,
      rowsPerPage,
      merchantsPerPage,
      allMerchants
    } = this.props;

    return (
      <StyledLayout>
        <h1>Merchants</h1>

        {renderIf(isLoading)(<div>Loading...</div>)}
        {renderIf(!isLoading)(
          <Paper style={{ overflow: 'scroll' }}>
            <Toolbar>
              <Button onClick={this.add}>Add New</Button>

              <SearchBar onChange={this.onChangeSearch} />
            </Toolbar>

            <Table id="merchant-table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Avatar</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Has Premium</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {merchantsPerPage.map(merchant => {
                  return (
                    <TableRow key={merchant.id}>
                      <TableCell>{merchant.id}</TableCell>
                      <TableCell>
                        <img
                          alt="Avatar"
                          height="30px"
                          src={merchant.avatarUrl}
                        />
                      </TableCell>
                      <TableCell>{merchant.firstname}</TableCell>
                      <TableCell>{merchant.lastname}</TableCell>
                      <TableCell>{merchant.email}</TableCell>
                      <TableCell>{merchant.phone}</TableCell>
                      <TableCell className="align-center">
                        {merchant.hasPremium ? <span>&#10004;</span> : ''}
                      </TableCell>
                      <TableCell>
                        <Action>
                          <IconButton
                            title="Edit"
                            onClick={this.onClickEdit.bind(this, merchant)}
                          >
                            <Icon>edit_icon</Icon>
                          </IconButton>
                          <IconButton
                            title="Remove"
                            onClick={this.onClickRemove.bind(this, merchant)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Action>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <TablePagination
              count={allMerchants.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={this.onChangePage}
              onChangeRowsPerPage={this.onChangeRowsPerpage}
            />
          </Paper>
        )}
      </StyledLayout>
    );
  }
}

const mapStateToProps = state => ({
  allMerchants: selector.getAllMerchants(state),
  page: selector.getPage(state),
  rowsPerPage: selector.getRowsPerPage(state),
  merchantsPerPage: selector.getMerchantsPerPage(state)
});

export default connect(mapStateToProps)(MerchantPage);

const StyledLayout = styled(Layout)`
  table#merchant-table {
    th {
      white-space: nowrap;
    }

    .align-center {
      text-align: center;
    }
  }
`;

const Action = styled.div`
  width: 97px;
`;

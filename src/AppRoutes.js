import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Page404 } from './modules/page404';
import * as merchant from './modules/merchant';

export default function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/merchants" component={merchant.MerchantPage} />
      <Route exact path="/merchants/add" component={merchant.AddEditMerchant} />
      <Route exact path="/merchants/:id" component={merchant.AddEditMerchant} />
      <Route path="*" component={Page404} />
    </Switch>
  );
}

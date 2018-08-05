import * as React from "react";
import { Navigation } from "react-native-navigation";
import registerScreens from "./screen";
// import Icon from 'react-native-vector-icons/FontAwesome';
import * as actions from "./actions/index";
import { Provider } from "react-redux";
import configureStore from "./store";

const store = configureStore();
registerScreens(store, Provider);

export default class App {
  constructor(props) {
    this.startApp();
  }
  startApp() {
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: "One",
          screen: "searchRepository.SearchRepositoryPage",
          title: "Screen One"
        },
        {
          label: "Two",
          screen: "searchRepository.SagasPostSearchPage",
          title: "Screen Two"
        },
        {
          label: "Three",
          screen: "searchRepository.RecomposeCounterPage",
          title: "Screen Two"
        }
      ]
    });
  }
}

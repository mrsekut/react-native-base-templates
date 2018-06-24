import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions';
import styled from 'styled-components/native';
import { View, TextInput, FlatList, AppState } from 'react-native';

import SubmittionBox from '../../components/molecules/SubmittionBox/index';
import ListWithIcon from '../../components/molecules/ListWithIcon/index';

// TODO: udemy
// TODO: android navigaton
// TODO: ios icon
// TODO: 型を定義
// TODO: android icon
// TODO: storybookのテスト
// TODO: atomic designの本をもっとやんと読む

interface Props {
	page: number;
	actions: any;
}

interface State {
	items: string[];
	text: string;
	refreshing: boolean;
}
// https://stackoverflow.com/questions/47561848/property-value-does-not-exist-on-type-readonly?rq=1&utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

const mapStateToProps = (state: State): any => {
	return {
		items: state.main_reducer.items,
		refreshing: state.main_reducer.refreshing
	};
};

const mapDispatchToProps = (dispatch: Dispath): any => {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
};

class MainPage extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			text: ''
		};
	}
	page = 1;

	componentDidMount(): void {
		AppState.addEventListener('change', this.onChangeState);
	}

	componentWillUnmount(): void {
		AppState.removeEventListener('change', this.onChangeState);
	}

	public render() {
		return (
			<Container>
				<SubmittionBox
					buttonText={'search'}
					onChange={text => this.setState({ text })}
					onPress={() => this.fetchRepositories(true)}
				/>

				<FlatList
					data={this.props.items}
					renderItem={({ item }) => (
						<ListWithIcon
							item={item}
							name={item.name}
							source={item.owner.avatar_url}
							user={item.owner.login}
							onPress={() => this.navigateToDetail(item)}
						/>
					)}
					keyExtractor={item => item.id}
					onEndReached={() => this.fetchRepositories()}
					onEndReachedThreshold={0.1}
					onRefresh={() => this.fetchRepositories(true)}
					refreshing={this.props.refreshing}
				/>
			</Container>
		);
	}

	onChangeState = appState => {
		if (appState === 'active') {
			this.fetchRepositories(true);
		}
	};

	private navigateToDetail(item) {
		this.props.navigator.push({
			screen: 'searchRepository.DetailPage',
			passProps: item
		});
	}

	fetchRepositories(refreshing: boolean = false) {
		const newPage = refreshing ? 1 : this.page + 1;
		this.setState({ refreshing });
		fetch(
			`https://api.github.com/search/repositories?q=${
				this.state.text
			}&page=${newPage}`
		)
			.then(response => response.json())
			.then(({ items }) => {
				this.page = newPage;
				if (refreshing) {
					this.props.actions.switchRefreshing(this.props.refreshing);
				}
				this.props.actions.pushItem(items);
			});
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainPage);

const Container = styled.View`
	background-color: #f5fcff;
	justify-content: center;
	padding: 5px;
	flex: 1;
`;

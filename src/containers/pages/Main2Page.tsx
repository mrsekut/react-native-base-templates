import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as appActions from '../../actions/index';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';
import actions from '../../actions/index';

import Button from '../../components/atoms/Button/index';
import ListItem from '../../components/atoms/ListItem/index';

interface Props {
	page: number;
	actions: any;
}

interface State {
	showText: string;
}

const mapStateToProps = (state: State) => {
	return {
		showText: state.reducer.showText
	};
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>) => {
	return {
		actions: bindActionCreators(actions, dispatch)
		// changeText() {
		// 	dispatch(appActions.changeTextAction());
		// }
	};
};

class MainPage2 extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
	}
	public render() {
		return (
			<Container>
				<View>
					<Text style={{ fontSize: 20 }}>{this.props.showText}</Text>
					<Button onPress={this.props.actions.changeTextAction}>
						change the text
					</Button>
				</View>
			</Container>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainPage2);

const Container = styled.View`
	background-color: #f5fcff;
	justify-content: center;
	align-items: center;
	flex: 1;
`;

import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class DetailPage extends React.Component {
	constructor(props: any) {
		super(props);
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>ooooooooooo!!!!!!!!!</Text>
				<Text style={styles.welcome}>{this.props.name}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	}
});

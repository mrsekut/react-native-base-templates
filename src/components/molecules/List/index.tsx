import * as React from 'react';
import styled from 'styled-components/native';
import styledComponents from 'styled-components';
import styledComponentsTS from 'styled-components-ts';
import Button from '../../atoms/Button/index';
import ListItem from '../../atoms/ListItem/index';
import { View } from 'react-native';

interface Props {
	children?: string;
	onPress?: () => void;
}

const List: React.SFC<Props> = ({ children, onPress, ...props }) => (
	<Wrapper {...props}>
		<ListItem>{children}</ListItem>
		<StyledButton onPress={onPress} {...props}>
			Delete
		</StyledButton>
	</Wrapper>
);
export default List;

interface StyledProps {
	onPress?: () => void;
}

const Wrapper = styled.View`
	flex-direction: row;
	background-color: #fff;
	padding: 10px;
	justify-content: space-between;
`;

const StyledButton = styledComponentsTS<StyledProps>(styledComponents(Button))`
	background-color: #e65100;
`;
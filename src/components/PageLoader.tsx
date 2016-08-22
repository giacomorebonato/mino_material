import React = require('react')
import { Flex } from 'react-flex'
import ProgressBar from 'react-toolbox/lib/progress_bar'


function PageLoader (Component: React.ComponentClass<any>, loading_time: number = 500) {
	class Enhanced extends React.Component<any, any> {
		constructor (props) {
			super(props)

			this.state = {
				loading: true
			}
		}
		componentDidMount () {
			setTimeout(() => {
				this.setState({ loading: false })
			}, loading_time)
		}
		render () {
			const { props } = this

			if (this.state.loading) {
				return (
					<Flex
						justifyContent='center'
						alignItems='center'
						style={{height: '100%'}}
					>
						<ProgressBar type='circular' mode='indeterminate' />
					</Flex>
				)
			}

			return <Component {...props} />
		}
	}

	return Enhanced
}

export default PageLoader

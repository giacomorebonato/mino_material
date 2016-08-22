import * as React from 'react'

function OnlyIf (props: IOnlyIfProps) {
	let success = false

	if (typeof props.condition === 'boolean') {
		success = props.condition as boolean
	} else {
		success = (props.condition as ConditionResolver)()
	}

	return success ? props.children : null
}

type Condition = boolean
type ConditionResolver = () => boolean
type ConditionOrResolver = Condition | ConditionResolver

interface IOnlyIfProps {
	children: any
	condition: ConditionOrResolver
}

export default OnlyIf

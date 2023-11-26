import GenericButton from 'components/Button/GenericButton'

interface Prop {
  dataKey: string
}

const GoToDappButton = (prop: Prop) => {
  const onOpenDapp = () => {
    window.open(`/room/${prop.dataKey}`, '_blank')
  }

  return <GenericButton name="Access Dapp" onClick={onOpenDapp} />
}

export default GoToDappButton

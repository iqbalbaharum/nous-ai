import TypographyNormal from 'components/Typography/Normal'

const ExchangeTransaction = () => {
  return (
    <div className="flex flex-col gap-1 px-4 py-2">
      <div className="text-sm">
        <TypographyNormal>
          <span className="text-yellow-400">0xaeE5...8730</span> <span className="text-green-400">subscribed</span>{' '}
          <span>10</span> access
        </TypographyNormal>
      </div>
      <div className="text-sm">
        <TypographyNormal>
          <span className="text-yellow-400">0xaeE5...8730</span> <span className="text-red-400">unsubscribed</span>{' '}
          <span>1</span> access
        </TypographyNormal>
      </div>
      <div className="text-sm">
        <TypographyNormal>
          <span className="text-yellow-400">0xaeE5...8730</span> <span className="text-green-400">subscribed</span>{' '}
          <span>2</span> access
        </TypographyNormal>
      </div>
    </div>
  )
}

export default ExchangeTransaction

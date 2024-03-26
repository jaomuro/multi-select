import { Option } from '@/components/ui/multiple-selector'

export function getArrayPopulated() {
  const options: Option[] = []

  // Gerar objetos para afetação parcial
  for (let i = 1; i <= 16; i++) {
    options.push({
      label: i.toString(),
      value: i.toString() + '-partial',
      ponNumber: i.toString(),
      isTotalAffected: false,
      group: 'Afetação parcial',
    })
  }

  // Gerar objetos para afetação total
  for (let i = 1; i <= 16; i++) {
    options.push({
      label: i.toString(),
      value: i.toString() + '-total',
      ponNumber: i.toString(),
      isTotalAffected: true,
      group: 'Afetação total',
    })
  }

  return options
}

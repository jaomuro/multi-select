import { FormRA } from './components/form-ra'
import { FormRACompleted } from './components/form-ra-completed'
import { FormRAArrayfield } from './components/form-ra-use-array-fields'
import MultipleSelectorWithForm from './components/ui/form-multi-select'

export function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* <MultipleSelectorWithForm /> */}
      {/* <FormRA /> */}
      {/* <FormRACompleted /> */}
      <FormRAArrayfield />
    </div>
  )
}

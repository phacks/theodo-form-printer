import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Accordion, Label, Container } from 'semantic-ui-react'

import formStatus from '@config/formStatus'

class ListForms extends PureComponent {
  render () {
    const panels = this.props.forms.map((form, index) => {
      let label
      switch (form.status) {
        case formStatus.OK:
          label = <Label color='olive' className='pinned'>Perf OK</Label>
          break
        case formStatus.KO:
          label = <Label color='red' className='pinned'>Perf KO</Label>
          break
        default:
          label = <Label color='pink' className='pinned'>error</Label>
      }

      const formTitle = form.sprint ? `${form.project} - Sprint ${form.sprint} - ${new Date(form.timestamp)}` : `${form.project}`
      return {
        title: <span>{formTitle} {label}</span>,
        content: null,
        key: `${form.project} - Sprint ${form.sprint} - ${index}`
      }
    })

    if (this.props.forms.length > 0) {
      return <Container className={`company-${this.props.selectedCompany.name}`} >
        <Container style={{ margin: '10px', display: 'flex', flexDirection: 'column' }}>
          <Container textAlign='center'>
            <Label color='green' >Perf OK: {this.props.numberOfOk} / {this.props.forms.length} - {Math.round(this.props.numberOfOk * 100 / this.props.forms.length)}%</Label>
            <Label color='red' >Perf KO: {this.props.numberOfKo} / {this.props.forms.length} - {Math.round(this.props.numberOfKo * 100 / this.props.forms.length)}%</Label>
          </Container>
        </Container>
        <Container style={{ display: 'flex', justifyContent: 'center' }} textAlign='left'>
          <Accordion panels={panels} styled />
        </Container>
      </Container>
    } else {
      return <Container as='p'>To load the latest form, please click on "update the latest forms"</Container>
    }
  }
}

ListForms.propTypes = {
  forms: PropTypes.array.isRequired,
  selectedCompany: PropTypes.object.isRequired,
  numberOfWow: PropTypes.number.isRequired,
  numberOfOk: PropTypes.number.isRequired,
  numberOfKo: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired
}

const mapStateToProps = ({
  loading,
  forms,
  questions,
  selectedCompany,
  numberOfWow,
  numberOfOk,
  numberOfKo
}) => ({
  loading,
  forms,
  questions,
  selectedCompany,
  numberOfWow,
  numberOfOk,
  numberOfKo
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ListForms)

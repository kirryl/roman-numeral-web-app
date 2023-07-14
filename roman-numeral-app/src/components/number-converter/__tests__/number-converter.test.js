import { render, screen, cleanup, getByLabelText } from '@testing-library/react';
import NumberConverter from '../number-converter';
import { fireEvent, userEvent } from '@testing-library/react';


afterEach(() => {
    cleanup();
})

test('should render number converter component', () => {
    render(<NumberConverter/>);
    const converter = screen.getByTestId('number-converter');

    expect(converter).toBeInTheDocument();
})

test('should render titles', () => {
    render(<NumberConverter/>);
    const title = screen.getByTestId('number-converter-title');
    const formTitle = screen.getByTestId('number-converter-form-title');

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Denary to Roman Numeral Converter');
    expect(formTitle).toBeInTheDocument();
    expect(formTitle).toHaveTextContent('Denary Number');
})

test('should not render titles', () => {
    render(<NumberConverter/>);
    const outputTitle = screen.queryByTestId('number-converter-output-title');
    const outputValue = screen.queryByTestId('number-converter-output-value');
    const alert = screen.queryByTestId('number-converter-form-alert');
    const hyperlink = screen.queryByTestId('number-converter-hyperlink');

    expect(outputTitle).not.toBeInTheDocument();
    expect(outputValue).not.toBeInTheDocument();
    expect(alert).not.toBeInTheDocument();
    expect(hyperlink).not.toBeInTheDocument();
})

test('should convert a numeral to roman', () => {
    const { getByTestId, getByRole } = render(<NumberConverter/>);
    
    const field = getByTestId('number-converter-form-field');
    fireEvent.change(field, {'target': {'value': '1'}});
    const btn = screen.getByTestId('number-converter-form-submit');
    fireEvent.click(btn)

    const outputValue = screen.queryByTestId('number-converter-output-value');

    expect(outputValue).toHaveTextContent("I")
})

test('should convert a numeral to roman 2', () => {
    const { getByTestId, getByRole } = render(<NumberConverter/>);
    
    const field = getByTestId('number-converter-form-field');
    fireEvent.change(field, {'target': {'value': '10'}});
    const btn = screen.getByTestId('number-converter-form-submit');
    fireEvent.click(btn)

    const outputValue = screen.queryByTestId('number-converter-output-value');
    expect(outputValue).toHaveTextContent("X")
})

test('should convert a numeral to roman 3', () => {
    const { getByTestId, getByRole } = render(<NumberConverter/>);
    
    const field = getByTestId('number-converter-form-field');
    fireEvent.change(field, {'target': {'value': '100'}});
    const btn = screen.getByTestId('number-converter-form-submit');
    fireEvent.click(btn)

    const outputValue = screen.queryByTestId('number-converter-output-value');
    expect(outputValue).toHaveTextContent("C")
})

test('should convert 0 to Nulla', () => {
    const { getByTestId, getByRole } = render(<NumberConverter/>);
    
    const field = getByTestId('number-converter-form-field');
    fireEvent.change(field, {'target': {'value': '0'}});
    const btn = screen.getByTestId('number-converter-form-submit');
    fireEvent.click(btn)

    const outputValue = screen.queryByTestId('number-converter-output-value');
    expect(outputValue).toHaveTextContent("Nulla")
})

test('should display error on negative', () => {
    const { getByTestId, getByRole } = render(<NumberConverter/>);
    
    const field = getByTestId('number-converter-form-field');
    fireEvent.change(field, {'target': {'value': '-1'}});
    const btn = screen.getByTestId('number-converter-form-submit');
    fireEvent.click(btn)

    const outputValue = screen.queryByTestId('number-converter-form-alert');
    expect(outputValue).toHaveTextContent("The number must be between 0 and 9999")
})

test('should display error on over 9999', () => {
    const { getByTestId, getByRole } = render(<NumberConverter/>);
    
    const field = getByTestId('number-converter-form-field');
    fireEvent.change(field, {'target': {'value': '10000'}});
    const btn = screen.getByTestId('number-converter-form-submit');
    fireEvent.click(btn)

    const outputValue = screen.queryByTestId('number-converter-form-alert');
    expect(outputValue).toHaveTextContent("The number must be between 0 and 9999")
})

test('should display hyperlink on conversion', () => {
    const { getByTestId, getByRole } = render(<NumberConverter/>);
    
    const field = getByTestId('number-converter-form-field');
    fireEvent.change(field, {'target': {'value': '1'}});
    const btn = screen.getByTestId('number-converter-form-submit');
    fireEvent.click(btn)

    const hyperlink = screen.queryByTestId('number-converter-hyperlink');

    expect(hyperlink).toBeInTheDocument();
})

test('should not display value or hyperlink on fail', () => {
    const { getByTestId, getByRole } = render(<NumberConverter/>);
    
    const field = getByTestId('number-converter-form-field');
    fireEvent.change(field, {'target': {'value': '-1'}});
    const btn = screen.getByTestId('number-converter-form-submit');
    fireEvent.click(btn)

    const hyperlink = screen.queryByTestId('number-converter-hyperlink');
    const outputValue = screen.queryByTestId('number-converter-output-value');

    expect(outputValue).not.toBeInTheDocument();
    expect(hyperlink).not.toBeInTheDocument();
})

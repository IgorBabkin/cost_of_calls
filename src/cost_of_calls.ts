function find_free_number(totals: { [id: number]: number }): number {
    const phone_numbers = Object.keys(totals);
    if (phone_numbers.length == 1)
        return null;

    const max_total = Math.max.apply(null, phone_numbers.map((phone) => totals[phone]));
    return Math.min.apply(null, phone_numbers.filter((phone) => totals[phone] == max_total));
}

function parse_data(logs: string): { [id: number]: number } {
    const pattern = /(\d{2}):(\d{2}):(\d{2}),(\d{3}-\d{3}-\d{3})/;
    return logs.split("\n").reduce((calls, call_log) => {
        const [call_string, hh, mm, ss, phone_string] = call_log.match(pattern);
        const phone_number = parseInt(phone_string.replace(/-/g, ""));
        if (!calls[phone_number])
            calls[phone_number] = 0

        calls[phone_number] += parseInt(hh) * 3600 + parseInt(mm) * 60 + parseInt(ss);
        return calls;
    }, {});
}

function calculate_total(values: number[]): number {
    return values.reduce((sum, value) => {
        if (value / 60 < 5)
            return sum + value * 3;
        else if (value / 60 >= 5) {
            return sum + Math.round(value / 60) * 150 + (value % 60 == 0 ? 0 : 150)
        }
        return sum;
    }, 0)
}

export default function cost_of_calls(logs: string): number {
    const totals = parse_data(logs);
    const free_number = find_free_number(totals);

    const costs = Object.keys(totals)
        .filter((phone) => parseInt(phone) != free_number)
        .map((key) => totals[key]);

    return calculate_total(costs);
}
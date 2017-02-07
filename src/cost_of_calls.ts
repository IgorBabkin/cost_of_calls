type CallsDurations = { [phone: number]: number };

function find_free_number(calls_durations: CallsDurations): number {
    const phones = Object.keys(calls_durations);
    if (phones.length == 1)
        return null;

    const max_total = Math.max.apply(null, phones.map((phone) => calls_durations[phone]));
    return Math.min.apply(null, phones.filter((phone) => calls_durations[phone] == max_total));
}

function parse_data(logs: string): CallsDurations {
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

function calculate_total_cost(calls_durations: CallsDurations, excluded_phone_number: number): number {
    return Object.keys(calls_durations)
        .filter((phone) => parseInt(phone) != excluded_phone_number)
        .map((key) => calls_durations[key]).reduce((sum, value) => {
            if (value / 60 < 5)
                return sum + value * 3;
            else if (value / 60 >= 5) {
                return sum + Math.round(value / 60) * 150 + (value % 60 == 0 ? 0 : 150)
            }
            return sum;
        }, 0)
}

export default function cost_of_calls(logs: string): number {
    const calls_durations = parse_data(logs);
    const free_number = find_free_number(calls_durations);
    return calculate_total_cost(calls_durations, free_number);
}
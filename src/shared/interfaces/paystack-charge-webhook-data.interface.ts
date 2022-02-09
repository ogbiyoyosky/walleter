export interface PaystackChargeWebhookData {
    "event":"charge.success",
    "data": {  
        "id": number;
        "domain": string;
        "status": string;
        "reference": string;
        "amount": number;
        "message"?: string;
        "gateway_response": string,
        "paid_at": Date;
        "created_at": Date;
        "channel": string;
        "currency": "NGN" | "USD",
        "ip_address": string,
        "metadata": any,
        "log": object,
        "fees"?: any;
        "customer": {  
            "id": number;
            "first_name": string;
            "last_name": string;
            "email": string;
            "customer_code": string;
            "phone": string;
            "metadata": string;
            "risk_action": string;
        },
        "authorization": {  
            "authorization_code": string;
            "bin": string;
            "last4": string;
            "exp_month": string;
            "exp_year": string;
            "card_type": string;
            "bank": string;
            "country_code": string;
            "brand": string;
            "account_name": string;
        },
        "plan": object;
    } 
}

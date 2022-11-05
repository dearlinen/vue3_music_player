import { ElMessage } from 'element-plus'



export const message = {
    error: (message) =>
        ElMessage({
            message,
            type: 'error'
        }),
    warning: (message) =>
        ElMessage({
            message,
            type: 'warning'
        }),
    info: (message) =>
        ElMessage({
            message,
            type: 'info'
        }),
    success: (message) =>
        ElMessage({
            message,
            type: 'success'
        }),

}


<?php
if (!isset($params['escape']) || $params['escape'] !== false) {
    $message = h($message);
}
?>
<div class="alert alert-success text-center" onclick="this.classList.add('hidden')"><?= $message ?></div>

<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Gap $gap
 */
?>
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Html->link(__('Edit Gap'), ['action' => 'edit', $gap->gap_id]) ?> </li>
        <li><?= $this->Form->postLink(__('Delete Gap'), ['action' => 'delete', $gap->gap_id], ['confirm' => __('Are you sure you want to delete # {0}?', $gap->gap_id)]) ?> </li>
        <li><?= $this->Html->link(__('List Gaps'), ['action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Gap'), ['action' => 'add']) ?> </li>
    </ul>
</nav>
<div class="gaps view large-9 medium-8 columns content">
    <h3><?= h($gap->gap_id) ?></h3>
    <table class="vertical-table">
        <tr>
            <th scope="row"><?= __('gap_id') ?></th>
            <td><?= $this->Number->format($gap->gap_id) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('poll_id') ?></th>
            <td><?= $this->Number->format($gap->poll_id) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('start_date') ?></th>
            <td><?= h($gap->start_date) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('end_date') ?></th>
            <td><?= h($gap->end_date) ?></td>
        </tr>
    </table>
</div>
